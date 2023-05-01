import jwt from "jsonwebtoken";

import environment from "../config/environment-variables";

const tokenVerify = (token: any) => jwt.verify(token, environment.jwtSecret);

export default tokenVerify;
