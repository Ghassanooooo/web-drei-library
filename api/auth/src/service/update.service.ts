import LessonModel from "../models/user.model";

export async function updateLesson(input: any) {
  try {
    const payload = await LessonModel.findByIdAndUpdate(
      { _id: input.id },
      {
        content: input.content,
      }
    );
    console.log("updateLesson ==> payload", payload);
    return payload;
  } catch (e) {
    throw e;
  }
}
