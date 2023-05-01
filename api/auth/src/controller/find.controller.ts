import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import service from "../service";
export async function authenticate(req: Request, res: Response) {
  const payload = await service.find.authenticate(req);
  res.status(StatusCodes.OK).json(payload);
}
