import mongoose from "mongoose";

import toJSON from "./plugins/toJSON.plugin";
import paginate from "./plugins/paginate.plugin";

const Schema = new mongoose.Schema(
  {
    content: {
      type: String,

      default: "# Hello World",
    },

    title: {
      type: String,
      default: "Untitled",
    },

    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

Schema.plugin(toJSON);
Schema.plugin(paginate);

export default mongoose.model("Markdown", Schema);
