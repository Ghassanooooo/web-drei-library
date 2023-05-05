import { connect, ConsumeMessage } from "amqplib";
import { EventEmitter } from "events";
import environmentVariables from "../config/environment-variables";

async function createToken(data: any) {
  return { name: "auth created token" };
}

class MessageHandler {
  static async handle(action: string, data: any) {
    let result;
    switch (action) {
      case "create.token":
        result = createToken(data);
        break;
      default:
        throw new Error("Invalid action");
    }
    return result;
  }
}

class RabbitMQ {
  private queue: string = environmentVariables.serviceName;
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
        const { correlationId, replyTo, headers } = message.properties;
        if (headers?.action) {
          const data = JSON.parse(message.content.toString());

          const result = await MessageHandler.handle(headers?.action, data);
          this.producerChannel.sendToQueue(
            replyTo,
            Buffer.from(JSON.stringify(result)),
            { expiration: 10, correlationId, replyTo }
          );
        } else {
          this.eventEmitter.emit(correlationId.toString(), message);
        }
      },
      { noAck: true }
    );
  }
  async producerMessages(
    sendTo: string,
    replyTo: string,
    action: string | null,
    data: any,
    correlationId: string
  ) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    console.log("producer send producerChannel==> ", data);
    this.producerChannel.sendToQueue(
      sendTo,
      Buffer.from(JSON.stringify(data)),
      { expiration: 10, correlationId, replyTo, headers: { action } }
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
