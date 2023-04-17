import { Request, Response } from "express";
import {
  createLesson,
  getLesson,
  getLessons,
  deleteLesson,
  updateLesson,
} from "../service/lesson.service";

export async function getLessonHandler(req: Request, res: Response) {
  try {
    const output = await getLesson({ id: req.params.id });
    return res.json(output);
  } catch (e: any) {
    return res.status(409).json(e.message);
  }
}

export async function createLessonHandler(req: Request, res: Response) {
  try {
    const output = await createLesson(req.body);
    return res.json(output);
  } catch (e: any) {
    return res.status(409).json(e.message);
  }
}

export async function getLessonsHandler(req: Request, res: Response) {
  try {
    const output = await getLessons({});
    return res.json(output);
  } catch (e: any) {
    return res.status(409).json(e.message);
  }
}

export async function updateLessonHandler(req: Request, res: Response) {
  try {
    const output = await updateLesson({ id: req.params.id, ...req.body });
    return res.json(output);
  } catch (e: any) {
    return res.status(409).json(e.message);
  }
}

export async function deleteLessonHandler(req: Request, res: Response) {
  try {
    const output = await deleteLesson({ id: req.params.id });
    return res.json(output);
  } catch (e: any) {
    return res.status(409).json(e.message);
  }
}
