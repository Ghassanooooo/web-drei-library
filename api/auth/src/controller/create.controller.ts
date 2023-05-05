import { Request, Response } from "express";
import service from "../service";
import utils from "../utils";
import RabbitMQ from "../utils/rabbitmq";

import { randomUUID } from "crypto";

export async function createLessonHandler(req: Request, res: Response) {
  try {
    // const output = await createLesson(req.body);
    // return res.json(output);
  } catch (e: any) {
    return res.status(409).json(e.message);
  }
}

export const createRefresh = async (req: any, res: any) => {
  const { refresh_token: refreshToken } = req.signedCookies;

  if (refreshToken) return res.status(401).json({ message: "Unauthorized" });

  try {
    const refresh_token: any = utils.tokenVerify(refreshToken);
    const model = await service.find.findModel({
      name: refresh_token.id.toString(),
    });
    const token = await model.findOne({ refreshToken });
    if (!token) res.status(403).json({ message: "Forbidden" });

    const correlationId: string = randomUUID();
    const user = await RabbitMQ.producerMessages(
      "users",
      "auth",
      "find.user",
      token,
      correlationId
    );
    // find user by email
    //2- generate new access token and send it to the client
  } catch (err) {
    return res.status(403).json({ message: "Forbidden" });
  }
};
