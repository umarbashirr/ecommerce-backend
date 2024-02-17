import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  // @ts-ignore
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

userSchema.methods.isPasswordMatch = async function (password: string) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

export default User;
