import mongoose from "mongoose";
import toJSON from "./plugins/toJSON.plugin";
import paginate from "./plugins/paginate.plugin";

const TokenSchema = new mongoose.Schema(
  {
    refreshToken: { type: String, required: true },
    isValid: { type: Boolean, default: true },
    userId: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

TokenSchema.plugin(toJSON);
TokenSchema.plugin(paginate);

export default (prefix: string) =>
  mongoose.model(prefix + ".tokens", TokenSchema);
