import LessonModel from "../models/user.model";

export async function deleteLesson(input: any) {
  try {
    const payload = await LessonModel.findByIdAndDelete({ _id: input.id });
    return payload;
  } catch (e) {
    throw e;
  }
}
