import mongoose from "mongoose";

import toJSON from "./plugins/toJSON.plugin";
import paginate from "./plugins/paginate.plugin";

const SlideSchema = new mongoose.Schema({
  totalSlides: {
    type: Number,
    required: [true, "Please provide total slides"],
    minlength: 0,
    maxlength: 500,
    default: 0,
  },
  totalVerticalSlides: {
    type: Number,
    required: [true, "Please provide total vertical slides"],
    minlength: 0,
    maxlength: 500,
    default: 0,
  },
  totalHorizontalSlides: {
    type: Number,
    required: [true, "Please provide total horizontal slides"],
    minlength: 0,
    maxlength: 500,
    default: 0,
  },
  state: {
    indexh: {
      type: Number,
      required: [true, "Please provide indexh"],
      minlength: 0,
      maxlength: 500,
      default: 0,
    },
    indexv: {
      type: Number,
      required: [true, "Please provide indexv"],
      minlength: 0,
      maxlength: 500,
      default: 0,
    },
    paused: {
      type: Boolean,
      required: [true, "Please provide paused"],
      default: false,
    },

    overview: {
      type: Boolean,
      required: [true, "Please provide overview"],
      default: false,
    },
  },
});

SlideSchema.plugin(toJSON);
SlideSchema.plugin(paginate);

export default mongoose.model("Slide", SlideSchema);
