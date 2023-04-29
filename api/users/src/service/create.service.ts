import User from "../models/user.model";
import crypto from "crypto";
import RabbitMQ from "../utils/rabbitmq";

export async function registerJwt(input: any) {
  const { name, email, password, confirmPassword } = input;
  const isUser = await User.findOne({ email });
  if (isUser) {
    throw new Error("The email already exists");
  } else {
    const isPasswordConfirmed = password === confirmPassword;
    if (!isPasswordConfirmed) throw new Error("The passwords do not match");
    else {
      const verificationToken = crypto.randomBytes(40).toString("hex");
      const payload = await User.create({
        name,
        email,
        password,
        verificationToken,
      });
      return payload;
    }
  }
}
