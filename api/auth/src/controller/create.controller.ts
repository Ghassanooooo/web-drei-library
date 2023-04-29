import { Request, Response } from "express";
import service from "../service";

export async function createLessonHandler(req: Request, res: Response) {
  try {
    // const output = await createLesson(req.body);
    // return res.json(output);
  } catch (e: any) {
    return res.status(409).json(e.message);
  }
}
