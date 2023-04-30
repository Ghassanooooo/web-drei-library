import express, { Express } from "express";
import "express-async-errors";
import cors from "cors";
import http from "http";
import mongoSanitize from "express-mongo-sanitize";
import connectDB from "./db/connect";
import routes from "./routes";
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import environmentVariables from "./config/environment-variables";
//import RabbitMQ from "./utils/rabbitmq";
import { connect, Connection, Channel, ConsumeMessage } from "amqplib";
async function connectRabbitMQ() {
  const connection = await connect("amqp://rabbitmq:5672");
  const channel = await connection.createChannel();
  await channel.assertQueue("auth");
  channel.consume("auth", (message: any) => {
    const { correlationId, replyTo } = message.properties;
    const reply = JSON.parse(message.content.toString());
    console.log(" auth recived ==> ", reply);
    channel.ack(message);
    channel.sendToQueue(
      replyTo,
      Buffer.from(JSON.stringify({ name: "auth created token" })),
      {
        correlationId,
        expiration: 10,
        replyTo,
      }
    );
  });
}

const app: Express = express();
const port = environmentVariables.port;
const origin = environmentVariables.origin;
app.use(cors({ origin, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(express.json());
app.use(express.static("public"));

routes(app);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const server = http.createServer(app);

server.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);
  // RabbitMQ.initialize();
  connectDB();
  setTimeout(() => {
    connectRabbitMQ();
  }, 5000);
});
