import mongoose from "mongoose";
import environmentVariables from "../config/environment-variables";

const dbUri: string = environmentVariables.dbUri || "mongodb://mongo:27017";
const dbName: string = environmentVariables.dbName || "lessons";
const connectDB = () => {
  mongoose
    .connect(dbUri, {
      dbName,
    })
    .then(() => {
      console.log("Mongodb connected....");
    })
    .catch((err) => console.log(err.message));

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to db...");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection is disconnected...");
  });
};
export default connectDB;
