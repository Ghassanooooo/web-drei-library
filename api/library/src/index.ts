import { Server } from "socket.io";
import express, { Express, Request, Response } from "express";
import { initTRPC } from "@trpc/server";
import http from "http";
import { z } from "zod";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import connectDB from "./db/connect";
import Slide from "./models/Slide";
connectDB();
const app: Express = express();
const server = http.createServer(app);
const port = process.env.PORT || 4223;
const origin = process.env.ORIGIN || "*";

app.use(cors({ origin, credentials: true }));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const t = initTRPC.create();

const router = t.router;
const publicProcedure = t.procedure;

const data = { indexh: 0, indexv: 0 };

const appRouter = router({
  getSlide: publicProcedure.query(async ({ ctx }) => {
    const slide = new Slide({});
    await slide.save();
    console.log("getSlide server", slide);
    return slide;
  }),

  updateSlide: publicProcedure
    .input(z.object({ indexh: z.number(), indexv: z.number() }))
    .output(z.object({ indexh: z.number(), indexv: z.number() }))
    .mutation(({ ctx, input }) => {
      data.indexh = input.indexh;
      data.indexv = input.indexv;
      console.log("updateSlide server", input);
      console.log("data server server ==> ", data);

      return input;
    }),
});
const createContext = () => {
  return { isAuth: true };
};

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

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

export type AppRouter = typeof appRouter;
