import model from "../models";
import RabbitMQ from "../utils/rabbitmq";
import { randomUUID } from "crypto";
import { Request } from "express";
import utils from "../utils";

export async function findModel({ name }: { name: string }) {
  const payload = model(name);
  return payload;
}

export async function loginJwt(input: any) {
  const { email, password } = input;
  console.log(email, password);
  if (!email || !password) {
    throw new Error("Please provide email and password");
  }
  //find user by email model
  const model = await findModel({ name: email });
  const user: any = await model.findOne({ email });
  console.log("find user by email model => ", user);
  if (!user) {
    throw new Error("The account does not exist. Please register");
  } else {
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid Credentials");
    }
    if (!user.isVerified) {
      throw new Error("Please verify your email");
    }
    const correlationId: string = randomUUID();
    const payload = await RabbitMQ.producerMessages(
      "auth",
      "users",
      "create.token",
      user,
      correlationId
    );

    return payload;
  }
}

export async function logout(req: Request) {
  const { refresh_token: refreshToken }: any = req.signedCookies;

  try {
    const correlationId: string = randomUUID();
    const token = await RabbitMQ.producerMessages(
      "auth",
      "users",
      "remove.token",
      refreshToken,
      correlationId
    );

    return !!token;
  } catch (err: any) {
    throw new Error(err);
  }
}
