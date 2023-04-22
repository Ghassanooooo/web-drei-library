import mongoose from "mongoose";

import toJSON from "./plugins/toJSON.plugin";
import paginate from "./plugins/paginate.plugin";

const Schema = new mongoose.Schema(
  {
    content: [
      {
        data: {
          type: String,
          required: true,
          default: "# Hello World",
        },
        type: {
          type: String,
          required: true,
          default: "markdown",
        },
      },
    ],

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
