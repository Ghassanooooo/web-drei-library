import { createJWT, isTokenValid, attachCookiesToResponse } from "./jwt";
import createTokenUser from "./createTokenUser";
import checkPermissions from "./checkPermissions";
import sendVerificationEmail from "./sendVerficationEmail";
import sendResetPasswordEmail from "./sendResetPasswordEmail";
import createHash from "./createHash";
import createToken from "./createToken";

export default {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
  createToken,
};
