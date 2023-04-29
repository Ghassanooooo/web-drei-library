import { Request, Response } from "express";
import service from "../service";
import { StatusCodes } from "http-status-codes";

export async function registerJwt(req: Request, res: Response) {
  const { name, email, password, confirmPassword } = req.body;
  try {
    const payload = await service.create.registerJwt({
      name,
      email,
      password,
      confirmPassword,
    });
    return res.status(StatusCodes.CREATED).json({
      message: "Success! Please check your email to verify account",
      payload: payload.email,
    });
  } catch (e: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: e.message });
  }
}
