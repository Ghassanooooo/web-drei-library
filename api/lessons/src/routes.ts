import { Express, Request, Response } from "express";
import {
  getLessonHandler,
  createLessonHandler,
  getLessonsHandler,
  updateLessonHandler,
  deleteLessonHandler,
  createMarkdownHorizontalSlideHandler,
} from "./controller/lesson.controller";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  app.post(
    "/lesson/:id/markdown/horizontal-slide",
    createMarkdownHorizontalSlideHandler
  );
  app.post("/lesson", createLessonHandler);

  app.get("/lesson/:id", getLessonHandler);
  app.get("/lessons", getLessonsHandler);
  app.put("/lesson/:id", updateLessonHandler);
  app.delete("/lesson/:id", deleteLessonHandler);
}
export default routes;
