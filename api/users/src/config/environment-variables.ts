import * as dotenv from "dotenv";
dotenv.config();

const environmentVariables: any = {
  nodeEnv: process.env.NODE_ENV,
  dbName: process.env.DB_NAME || "users",
  port: process.env.PORT,
  role: process.env.ROLE,
  origin: process.env.ORIGIN,
  jwtSecret: process.env.JWT_SECRET,
  serviceName: process.env.SERVICE_NAME,
};

export default environmentVariables;
