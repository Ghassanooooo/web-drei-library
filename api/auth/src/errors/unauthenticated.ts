import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

class UnauthenticatedError extends CustomAPIError {
  constructor(message: any) {
    super(message);
    // @ts-ignore
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
