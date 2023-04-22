import LessonModel from "../models/lesson.model";

export async function createLesson(input: any) {
  try {
    const payload = new LessonModel();
    await payload.save();
    return payload;
  } catch (e) {
    throw e;
  }
}

export async function getLessons(input: any) {
  try {
    const payload = await LessonModel.find();
    return payload;
  } catch (e) {
    throw e;
  }
}

export async function getLesson(input: any) {
  try {
    const payload = await LessonModel.findById(input.id);
    return payload;
  } catch (e) {
    throw e;
  }
}

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

export async function deleteLesson(input: any) {
  try {
    const payload = await LessonModel.findByIdAndDelete({ _id: input.id });
    return payload;
  } catch (e) {
    throw e;
  }
}
