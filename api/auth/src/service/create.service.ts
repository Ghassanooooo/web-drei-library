import model from "../models";
import utils from "../utils";
import jwt from "jsonwebtoken";
import environmentVariables from "../config/environment-variables";

export const createJWT = (id: any, expiresIn: number) => {
  const token = jwt.sign(id, environmentVariables.jwtSecret, {
    expiresIn: `${expiresIn}ms`,
  });
  return token;
};

export async function createModel({ name }: { name: string }) {
  const payload = model(name);
  return payload;
}

export async function createToken(input: any) {
  const tokens = utils.createToken(input);
  const model = await createModel({ name: input.id.toString() });
  const payload = new model({
    refreshToken: tokens.refreshToken.value,
    userId: input.id,
  });
  await payload.save();
  return tokens;
}

/**
 
 console.log("createToken => ", input);

  //const token = await findOneById(input.id);
  const token = false;
  const tokens = utils.createToken(input);
  if (token) {
    // console.log("createToken find=> ", input);
    // token.refreshToken = utils.createToken(input).refreshToken.value;
    // await token.save();
  } else {
    const payload = new Token({
      refreshToken: tokens.refreshToken.value,
      userId: input.id,
    });
    await payload.save();
 */
