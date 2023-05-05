import model from "../models";
import utils from "../utils";

export async function findModel({ name }: { name: string }) {
  const payload = model(name);
  return payload;
}

export async function removeToken(input: any) {
  try {
    const refresh_token: any = utils.tokenVerify(input);
    const model = await findModel({ name: refresh_token.id.toString() });
    const token = await model.findOneAndDelete({ refreshToken: input });
    console.log("findOneAndDelete =====> ", token);
    return token;
  } catch (err: any) {
    console.log(err);
  }
}
