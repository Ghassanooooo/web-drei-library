import { Request, Response } from "express";
import service from "../service";
import { StatusCodes } from "http-status-codes";

export async function loginJwt(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const payload: any = await service.find.loginJwt({
      email,
      password,
    });

    res.cookie(
      payload.accessToken.name,
      payload.accessToken.value,
      payload.accessToken.options
    );
    res.cookie(
      payload.refreshToken.name,
      payload.refreshToken.value,
      payload.refreshToken.options
    );
    res.status(StatusCodes.CREATED).send("Login successfully");
  } catch (e: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: e.message });
  }
}
