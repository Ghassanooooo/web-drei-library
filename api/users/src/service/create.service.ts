import model from "../models";
import crypto from "crypto";
import RabbitMQ from "../utils/rabbitmq";

export async function createModel({ name }: { name: string }) {
  const payload = model(name);
  return payload;
}

export async function registerJwt(input: any) {
  const { name, email, password, confirmPassword } = input;
  const model = await createModel({ name: email });
  const isUser = await model.findOne({ email });
  if (isUser) {
    throw new Error("The email already exists");
  } else {
    const isPasswordConfirmed = password === confirmPassword;
    if (!isPasswordConfirmed) throw new Error("The passwords do not match");
    else {
      const verificationToken = crypto.randomBytes(40).toString("hex");
      const payload = await model.create({
        name,
        email,
        password,
        verificationToken,
      });
      return payload;
    }
  }
}
