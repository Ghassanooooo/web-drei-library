import LessonModel from "../models/user.model";

export async function createLesson(input: any) {
  try {
    const content = {
      data: "# Hello World",
      type: "markdown",
    };
    const payload = new LessonModel();
    payload.content = [content];
    await payload.save();

    return payload;
  } catch (e) {
    throw e;
  }
}
