import { connect, Connection, Channel, ConsumeMessage } from "amqplib";
import environmentVariables from "../config/environment-variables";
import { EventEmitter } from "events";

class Consumer {
  constructor(
    private channel: any,
    private queue: string,
    private eventEmitter: EventEmitter
  ) {}
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
        this.eventEmitter.emit(correlationId.toString(), message);
      },
      { noAck: true }
    );
  }
}

class Producer {
  constructor(private channel: any, private eventEmitter: EventEmitter) {}
  async producerMessages(
    data: any,
    correlationId: string,
    replyToQueue: string
  ) {
    this.channel.sendToQueue(
      environmentVariables.serviceName,
      Buffer.from(data),
      {
        correlationId,
        replyTo: replyToQueue,
        expiration: 10,
      }
    );

    return new Promise((resolve, reject) => {
      this.eventEmitter.once(correlationId, async (message: ConsumeMessage) => {
        const reply = JSON.parse(message.content.toString());
        if (reply.error) {
          return reject(reply.error);
        }
        resolve(reply);
      });
    });
  }
}

class RabbitMQ {
  private producerChannel: any;
  private consumerChannel: any;
  private connection: any;
  private producer: any;
  private consumer: any;
  private eventEmitter: any;
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
      this.eventEmitter = new EventEmitter();
      this.producer = new Producer(this.producerChannel, this.eventEmitter);
      this.consumer = new Consumer(
        this.consumerChannel,
        queue,
        this.eventEmitter
      );
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
  // async consume()  todo
}

export default RabbitMQ.getInstance();
