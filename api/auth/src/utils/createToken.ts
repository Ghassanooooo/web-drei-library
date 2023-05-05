import jwt from "jsonwebtoken";
import environmentVariables from "../config/environment-variables";

export const createJWT = (user: any, secret: string, expiresIn: number) => {
  const token = jwt.sign(user, secret, { expiresIn: `${expiresIn}ms` });
  return token;
};

const createToken = ({ id }: any) => {
  const oneHour = 1000 * 60 * 60;
  //const oneDay = 1000 * 60 * 60 * 24;
  const oneMonth = 1000 * 60 * 60 * 24 * 30;
  const accessTokenJWT = createJWT(
    { id },
    environmentVariables.jwtSecret,
    oneHour
  );
  const refreshTokenJWT = createJWT(
    { id },
    environmentVariables.jwtSecret,
    oneMonth
  );

  return {
    accessToken: {
      name: "access_token",
      value: accessTokenJWT,
    },
    refreshToken: {
      name: "refresh_token",
      value: refreshTokenJWT,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        signed: true,
        maxAge: oneMonth,
      },
    },
  };
};

export default createToken;
