import { Express, Request, Response } from "express";
import controller from "./controller";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/auth", controller.find.authenticate);
}
export default routes;
