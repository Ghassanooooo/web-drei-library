import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

class NotFoundError extends CustomAPIError {
  constructor(message: any) {
    super(message);
    // @ts-ignore
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
