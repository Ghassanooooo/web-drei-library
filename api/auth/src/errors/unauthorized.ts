import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

class UnauthorizedError extends CustomAPIError {
  constructor(message: any) {
    super(message);
    // @ts-ignore
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default UnauthorizedError;
