import User from "../models/user.model";
import RabbitMQ from "../utils/rabbitmq";
import { randomUUID } from "crypto";

export async function loginJwt(input: any) {
  const { email, password } = input;
  if (!email || !password) {
    throw new Error("Please provide email and password");
  }

  const user: any = await User.findOne({ email });

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
