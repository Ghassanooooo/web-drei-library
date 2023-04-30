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
import bodyParser from "body-parser";
import RabbitMQ from "./utils/rabbitmq";
import cookieParser from "cookie-parser";
const app: Express = express();
const port = environmentVariables.port;
const origin = environmentVariables.origin;
app.use(cors({ origin, credentials: true }));
app.use(cookieParser(environmentVariables.jwtSecret));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));

routes(app);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const server = http.createServer(app);

server.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);
  connectDB();
  setTimeout(() => {
    RabbitMQ.initialize();
  }, 5000);
});
