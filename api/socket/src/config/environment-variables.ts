import * as dotenv from "dotenv";
dotenv.config();

export default {
  nodeEnv: process.env.NODE_ENV,
  dbUri: process.env.DB_URI,
  dbName: process.env.DB_NAME,
  port: process.env.PORT,
  role: process.env.ROLE,
  origin: process.env.ORIGIN,
};
