import LessonModel from "../models/user.model";

export async function getLessons(input: any) {
  try {
    const payload = await LessonModel.find();
    return payload;
  } catch (e) {
    throw e;
  }
}
