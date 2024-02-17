import { Schema, model } from "mongoose";

const socialSchema = new Schema(
  {
    facebook: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    instagram: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Social = model("Social", socialSchema);

export default Social;
