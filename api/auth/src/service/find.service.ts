import model from "../models";
import utils from "../utils";
import { Request } from "express";
export async function findModel({ name }: { name: string }) {
  const payload = model(name);
  return payload;
}

export async function authenticate(req: Request) {
  const { refresh_token: refreshToken } = req.signedCookies;
  let isAuth = false;
  try {
    const refresh_token: any = utils.tokenVerify(refreshToken);

    const model = await findModel({ name: refresh_token.id.toString() });
    const token = await model.findOne({ refreshToken });
    if (!!token) isAuth = true;
  } catch (err) {
    isAuth = false;
  } finally {
    return isAuth;
  }
}
