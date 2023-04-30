import { connect, Connection, Channel, ConsumeMessage } from "amqplib";
import environmentVariables from "../config/environment-variables";
import { EventEmitter } from "events";
import { randomUUID } from "crypto";

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
  private queue: string = "users";
  private producerChannel: any;
  private consumerChannel: any;
  private eventEmitter: any;
  private connection: any;
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
      this.connection = await connect("amqp://rabbitmq:5672");
      this.producerChannel = await this.connection.createChannel();
      this.consumerChannel = await this.connection.createChannel();
      await this.consumerChannel.assertQueue(this.queue);
      await this.producerChannel.assertQueue(this.queue);
      this.eventEmitter = new EventEmitter();
      this.isInitialized = true;
      this.consumerMessages();
    } catch (e) {
      throw new Error("RabbitMQ err " + e);
    }
  }

  async consumerMessages() {
    if (!this.isInitialized) {
      await this.initialize();
    }
    this.consumerChannel.consume(
      this.queue,
      async (message: ConsumeMessage) => {
        const { correlationId } = message.properties;
        this.eventEmitter.emit(correlationId.toString(), message);
      },
      { noAck: true }
    );
  }
  async producerMessages(
    serviceName: string,
    data: any,
    correlationId: string
  ) {
    if (!this.isInitialized) {
      await this.initialize();
    }
    console.log("producer send producerChannel==> ", data);
    this.producerChannel.sendToQueue(
      serviceName,
      Buffer.from(JSON.stringify(data)),
      { expiration: 10, correlationId, replyTo: this.queue }
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

export default RabbitMQ.getInstance();

/**
 
properties: {
 contentType: undefined,
 contentEncoding: undefined,
 headers: {},
 deliveryMode: undefined,
 priority: undefined,
 correlationId: '123456789',
 replyTo: 'users',
 expiration: '10',
 messageId: undefined,
 timestamp: undefined,
 type: undefined,
 userId: undefined,
 appId: undefined,
 clusterId: undefined
  }
 */
