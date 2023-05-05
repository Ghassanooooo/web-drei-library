import { Request, Response } from "express";
import service from "../service";
import { StatusCodes } from "http-status-codes";

export async function loginJwt(req: Request, res: Response) {
  const { email, password } = req.body;
  console.log("loginJwt ==> ", req);
  try {
    const payload: any = await service.find.loginJwt({
      email,
      password,
    });

    res.cookie(
      payload.refreshToken.name,
      payload.refreshToken.value,
      payload.refreshToken.options
    );
    console.log("payload.refreshToken ==> ", payload.refreshToken);
    res.status(StatusCodes.CREATED).json(payload.accessToken);
  } catch (e: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: e.message });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const payload = await service.find.logout(req);
    res.clearCookie("refresh_token");
    res.status(StatusCodes.OK).json(payload);
  } catch (e: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: e.message });
  }
}
