import express, { Express, Request, Response } from "express";
import { initTRPC } from "@trpc/server";
import http from "http";
import { z } from "zod";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import connectDB from "./db/connect";
import { v4 as uuid } from "uuid";
import Folder from "./models/Folder";
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

const appRouter = router({
  getFolders: publicProcedure.query(async ({ ctx }) => {
    const folders = await Folder.find();
    return folders;
  }),

  getFolder: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, rawInput }: any) => {
      console.log("Create getFolder ✌️✌️ => ", rawInput);
      const folder = await Folder.findById(rawInput.id);
      return folder;
    }),

  createFolder: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }: any) => {
      const folder = new Folder({ title: input.title, folderId: uuid() });
      await folder.save();
      return folder;
    }),

  editFolder: publicProcedure
    .input(z.object({ title: z.string(), id: z.string() }))
    .mutation(async ({ ctx, input }: any) => {
      const folder = await Folder.findByIdAndUpdate(
        { _id: input.id },
        { title: input.title },
        { new: true }
      );

      return folder;
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

server.listen(port, () => {
  console.log(`⚡️[server]: Port: ${port}`);
});

export type AppRouter = typeof appRouter;
