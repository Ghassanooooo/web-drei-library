import { Request, Response } from "express";
import {
  createFolder,
  getFolder,
  getFolders,
  deleteFolder,
  updateFolder,
} from "../service/folder.service";

export async function getFolderHandler(req: Request, res: Response) {
  try {
    const output = await getFolder({ id: req.params.id });
    return res.json(output);
  } catch (e: any) {
    return res.status(409).json(e.message);
  }
}

export async function createFolderHandler(req: Request, res: Response) {
  try {
    const output = await createFolder(req.body);
    return res.json(output);
  } catch (e: any) {
    return res.status(409).json(e.message);
  }
}

export async function getFoldersHandler(req: Request, res: Response) {
  try {
    const output = await getFolders({});
    return res.json(output);
  } catch (e: any) {
    return res.status(409).json(e.message);
  }
}

export async function updateFolderHandler(req: Request, res: Response) {
  try {
    const output = await updateFolder({ id: req.params.id, ...req.body });
    return res.json(output);
  } catch (e: any) {
    return res.status(409).json(e.message);
  }
}

export async function deleteFolderHandler(req: Request, res: Response) {
  try {
    const output = await deleteFolder({ id: req.params.id });
    return res.json(output);
  } catch (e: any) {
    return res.status(409).json(e.message);
  }
}
