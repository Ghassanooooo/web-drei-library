import { Express, Request, Response } from "express";
import controller from "./controller";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/users/create/register-jwt", controller.create.registerJwt);
  app.post("/users/find/login-jwt", controller.find.loginJwt);
}
export default routes;
