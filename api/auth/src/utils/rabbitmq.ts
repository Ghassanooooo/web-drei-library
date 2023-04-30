import { connect, ConsumeMessage } from "amqplib";
import { EventEmitter } from "events";
import environmentVariables from "../config/environment-variables";

async function createToken(data: any) {
  return { name: "auth created token new" };
}

class MessageHandler {
  static async handle(handler: string, data: any) {
    let result;
    switch (handler) {
      case "create.token":
        result = createToken(data);
        break;
      default:
        throw new Error("Invalid handler");
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
        if (headers?.handler) {
          const data = JSON.parse(message.content.toString());

          const result = await MessageHandler.handle(headers?.handler, data);
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
    handler: string | null,
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
      { expiration: 10, correlationId, replyTo, headers: { handler } }
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
 * 
 *   async messageHandler() {
    if (!this.isInitialized) {
      await this.initialize();
    }
    this.handlerConsumerChannel.consume(
      this.queueHandler,
      async (message: ConsumeMessage) => {
        const { correlationId, replyTo, type } = message.properties;

        const data = message.content.toString();
        console.log("handlerConsumerChannel ==> ", data);
        const payload = await MessageHandler.handle(type, JSON.parse(data));
        this.handlerProducerChannel.sendToQueue(
          replyTo,
          Buffer.from(JSON.stringify(payload)),
          {
            correlationId,
            expiration: 10,
            replyTo,
          }
        );
      },
      { noAck: true }
    );
  }
 
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

/*import { connect, Connection, Channel, ConsumeMessage } from "amqplib";
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
      this.connection = await connect("");
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
}

export default RabbitMQ.getInstance();
*/
