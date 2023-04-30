import * as dotenv from "dotenv";
dotenv.config();

export default {
  nodeEnv: process.env.NODE_ENV,
  dbName: process.env.DB_NAME || "users",
  port: process.env.PORT,
  role: process.env.ROLE,
  origin: process.env.ORIGIN,
  accessTokenSecret: process.env.JWT_SECRET,
  serviceName: process.env.SERVICE_NAME,
};
