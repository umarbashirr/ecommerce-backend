import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  profile: Schema.Types.ObjectId;
  isPasswordMatch: (password: string) => Promise<boolean>;
  generateToken: () => Promise<string>;
}

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

userSchema.methods.generateToken = async function () {
  const user = this;
  return await jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRY!,
    }
  );
};

const User = model<IUser>("User", userSchema);

export default User;
