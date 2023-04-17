import mongoose from "mongoose";

import toJSON from "./plugins/toJSON.plugin";
import paginate from "./plugins/paginate.plugin";

const FolderSchema = new mongoose.Schema(
  {
    totalContent: {
      type: Number,
      required: [true, "Please provide total content"],
      minlength: 0,
      maxlength: 1000,
      default: 0,
    },

    title: {
      type: String,
      required: [true, "Please provide Folder name"],
    },

    lable: {
      type: String,
      required: [true, "Please provide lable"],
      default: "folder",
    },
  },
  {
    timestamps: true,
  }
);

FolderSchema.plugin(toJSON);
FolderSchema.plugin(paginate);

export default mongoose.model("Folder", FolderSchema);
