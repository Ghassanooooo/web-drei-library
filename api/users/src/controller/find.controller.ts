import { Request, Response } from "express";
import service from "../service";
import { StatusCodes } from "http-status-codes";

export async function loginJwt(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const payload = await service.find.loginJwt({
      email,
      password,
    });
    return res.status(StatusCodes.CREATED).json({
      payload,
    });
  } catch (e: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: e.message });
  }
}
