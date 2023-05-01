import { Server } from "socket.io";
import express, { Express, Request, Response } from "express";
import http from "http";
import cors from "cors";
//import connectDB from "./db/connect";
import environmentVariables from "./config/environment-variables";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
//import Slide from "./models/Slide";
//connectDB();
const app: Express = express();
const server = http.createServer(app);
const port = environmentVariables.port || 4223;
const origin = environmentVariables.origin || "*";

app.use(cors({ origin, credentials: true }));
app.use(cookieParser(environmentVariables.jwtSecret));
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: any) => {
  console.log("IO connected  💪");
  socket.on("client-ready", () => {
    console.log("client-ready ❤️");
    socket.broadcast.emit("get-canvas-state");
  });

  socket.on("update", (update: any) => {
    console.log("received update", update);
    socket.broadcast.emit("reciveUpdate", update);
  });
  socket.on("reloadPage", (update: any) => {
    socket.broadcast.emit("reloadPage");
    console.log("received reloadPage", update);
    // socket.broadcast.emit("reciveUpdate", update);
  });
  // gen token https://github.com/reveal/multiplex/blob/master/index.js

  socket.on("broadcast-multiplex", (data: any) => {
    socket.broadcast.emit(data.socketId, data);
    console.log("broadcast-multiplex => ", data);
  });
  socket.on("clear", () => io.emit("clear"));
});

server.listen(port, () => {
  console.log(`⚡️[server]: Port: ${port}`);
});
