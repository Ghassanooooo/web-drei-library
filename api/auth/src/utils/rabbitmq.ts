import { connect, Connection, Channel, ConsumeMessage } from "amqplib";
import environmentVariables from "../config/environment-variables";

class Consumer {
  constructor(private channel: any, private queue: string) {}
  async consumerMessages() {
    console.log("consumer ready to consume messages..");
    this.channel.consume(
      this.queue,
      async (message: ConsumeMessage) => {
        const { correlationId, replyTo } = message.properties;
        if (!correlationId || !replyTo) {
          throw new Error(
            "Invalid message, correlationId or replyTo is missing"
          );
        }
        await RabbitMQ.getInstance().preduce(
          JSON.parse(message.content.toString()),
          correlationId,
          replyTo
        );
      },
      { noAck: true }
    );
  }
}

class Producer {
  constructor(private channel: any) {}
  async producerMessages(
    data: any,
    correlationId: string,
    replyToQueue: string
  ) {
    this.channel.sendToQueue(replyToQueue, Buffer.from(data), {
      correlationId,
    });
  }
}

class RabbitMQ {
  private producerChannel: any;
  private consumerChannel: any;
  private connection: any;
  private producer: any;
  private consumer: any;
  private constructor() {}
  private static instance: RabbitMQ;
  private isInitialized = false;
  public static getInstance(): RabbitMQ {
    if (!this.instance) {
      this.instance = new RabbitMQ();
    }
    return this.instance;
  }

  async initialize() {
    if (this.isInitialized) {
      return;
    }
    try {
      this.connection = await connect(environmentVariables.rabbitmqUri);
      this.producerChannel = await this.connection.createChannel();
      this.consumerChannel = await this.connection.createChannel();
      const { queue } = await this.consumerChannel.assertQueue(
        environmentVariables.serviceName,
        { exclusive: true }
      );

      this.producer = new Producer(this.producerChannel);
      this.consumer = new Consumer(this.consumerChannel, queue);
      this.consumer.consumerMessages();
      this.isInitialized = true;
    } catch (e) {
      throw new Error("RabbitMQ err " + e);
    }
  }
  async preduce(data: any, correlationId: string, replyToQueue: string) {
    if (!this.isInitialized) {
      await this.initialize();
    }
    return await this.producer.producerMessages(
      data,
      correlationId,
      replyToQueue
    );
  }
}

export default RabbitMQ.getInstance();
