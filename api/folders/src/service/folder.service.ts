import FolderModel from "../models/folder.model";

export async function createFolder(input: any) {
  try {
    const folder = new FolderModel({ title: input.title });
    await folder.save();
    return folder;
  } catch (e) {
    throw e;
  }
}

export async function getFolders(input: any) {
  try {
    const folders = await FolderModel.find();
    return folders;
  } catch (e) {
    throw e;
  }
}

export async function getFolder(input: any) {
  try {
    const folder = await FolderModel.findById(input.id);
    return folder;
  } catch (e) {
    throw e;
  }
}

export async function updateFolder(input: any) {
  try {
    const folder = await FolderModel.findByIdAndUpdate(
      { _id: input.id },
      { title: input.title },
      { new: true }
    );

    return folder;
  } catch (e) {
    throw e;
  }
}

export async function deleteFolder(input: any) {
  try {
    const folder = await FolderModel.findByIdAndDelete({ _id: input.id });
    return folder;
  } catch (e) {
    throw e;
  }
}
