import Token from "../models/token.model";
import utils from "../utils";

export async function createToken(input: any) {
  console.log("createToken => ", input);
  const token = await Token.findOne({ userId: input.id });
  const tokens = utils.createToken(input);
  if (token) {
    console.log("createToken find=> ", input);
    token.refreshToken = utils.createToken(input).refreshToken.value;
    await token.save();
  } else {
    console.log("createToken new=> ", input);
    const payload = new Token({
      refreshToken: tokens.refreshToken.value,
      userId: input.id,
    });
    await payload.save();
  }

  return tokens;
}
