import CustomError from "../errors";
import utils from "../utils";
import Token from "../models/token.model";
import User from "../models/user.model";
import environment from "../config/environment-variables";

const authenticateExternalUser = async (req: any, res: any, next: any) => {
  const { refreshToken, accessToken } = req.body;

  try {
    if (accessToken) {
      const payload = utils.isTokenValid(accessToken);
      const userId = payload.user.userId;
      const user = await User.findById(userId);
      req.user = user;
      // console.log("user accessToken==> ", user);

      return res.send({ user });
    }
    const payload = utils.isTokenValid(refreshToken);
    const userId = payload.user.userId;
    const user: any = await User.findById(userId);

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new CustomError.UnauthenticatedError("Authentication Invalid");
    }
    if (environment.role !== user?.role) {
      res.cookie("accessToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        signed: true,
        expires: new Date(Date.now()),
      });

      res.cookie("refreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        signed: true,
        expires: new Date(Date.now()),
      });
      throw new CustomError.UnauthenticatedError("Not Allowed");
    }
    // console.log("user refreshToken==> ", user);

    return res.send({ user });
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermissions = (...roles: any) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

export default {
  authenticateExternalUser,
  authorizePermissions,
};
