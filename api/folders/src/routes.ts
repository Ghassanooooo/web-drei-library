import { Express, Request, Response } from "express";
import {
  getFolderHandler,
  createFolderHandler,
  getFoldersHandler,
  updateFolderHandler,
  deleteFolderHandler,
} from "./controller/folder.controller";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  app.post("/folder", createFolderHandler);
  app.get("/folder/:id", getFolderHandler);
  app.get("/folders", getFoldersHandler);
  app.put("/folder/:id", updateFolderHandler);
  app.delete("/folder/:id", deleteFolderHandler);
}
export default routes;
