import * as dotenv from "dotenv";
dotenv.config();

export default {
  nodeEnv: process.env.NODE_ENV,
  dbUri: process.env.DB_URI || "mongodb://mongo:27017",
  dbName: process.env.DB_NAME || "users",
  port: process.env.PORT,
  role: process.env.ROLE,
  origin: process.env.ORIGIN,
  accessTokenSecret: process.env.JWT_SECRET,
  serviceName: process.env.SERVICE_NAME,
  rabbitmqUri: process.env.RABBITMQ_URI || "amqp://rabbitmq:5672",
};
