import { Schema, model } from "mongoose";

const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    billingAddress: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    shippingAddress: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    social: {
      type: Schema.Types.ObjectId,
      ref: "Social",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Profile = model("Profile", profileSchema);

export default Profile;
