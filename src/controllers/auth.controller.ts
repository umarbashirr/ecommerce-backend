import Profile from "../models/profile.model";
import User from "../models/user.model";
import ApiResponse from "../utils/apiResponse";

export const registerCtrl = async (req: any, res: any) => {
  const { firstName, lastName, username, email, password } = req.body;

  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !username?.trim() ||
    !email?.trim() ||
    !password?.trim()
  ) {
    return res
      .status(400)
      .json(new ApiResponse(400, "All fields are required"));
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, "Password must be at least 6 characters long")
      );
  }

  try {
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Username or email already exists"));
    }

    const profile = new Profile({
      firstName,
      lastName,
    });

    const updatedProfile = await profile.save();

    const newUser = new User({
      username,
      email,
      password,
      profile: updatedProfile._id,
    });

    const addedUser = await newUser.save();

    updatedProfile.user = addedUser._id;

    await updatedProfile.save();

    res.status(201).json(new ApiResponse(201, "User created successfully"));
  } catch (error: any) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

export const loginCtrl = async (req: any, res: any) => {
  const { username, password } = req.body;

  if (!username?.trim() || !password?.trim()) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Username and password are required"));
  }

  try {
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return res.status(404).json(new ApiResponse(404, "User not found"));
    }

    const isPasswordMatch = await user.isPasswordMatch(password);

    if (!isPasswordMatch) {
      return res.status(400).json(new ApiResponse(400, "Invalid credentials"));
    }

    const token = await user.generateToken();

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV === "production" ? true : false,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict",
      maxAge: parseInt(process.env.JWT_TOKEN_EXPIRY!) * 1000,
    });

    res.status(200).json(new ApiResponse(200, "Login successful", { token }));
  } catch (error: any) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};
