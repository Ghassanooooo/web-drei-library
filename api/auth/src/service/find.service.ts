import model from "../models";
import utils from "../utils";
import { Request } from "express";
export async function findModel({ name }: { name: string }) {
  const payload = model(name);
  return payload;
}

export async function authenticate(req: Request) {
  const { refresh_token: refreshToken, access_token: accessToken } =
    req.signedCookies;
  let isAuth = false;
  try {
    utils.tokenVerify(accessToken);
    isAuth = true;
  } catch (err) {
    const refresh_token: any = utils.tokenVerify(refreshToken);

    const model = await findModel({ name: refresh_token.id.toString() });
    const token = await model.findOne({ refreshToken });
    if (!!token) isAuth = true;
  } finally {
    return isAuth;
  }
}
