import mongoose from "mongoose";

const MONGO_URI = "mongodb://mongo:27017/";

const connectDB = () => {
  mongoose
    .connect(MONGO_URI, {
      dbName: "presentation",
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
