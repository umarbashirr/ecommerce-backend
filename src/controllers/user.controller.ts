import { Response } from "express";
import User from "../models/user.model";
import Profile from "../models/profile.model";
import ApiResponse from "../utils/apiResponse";

export const getUserProfileCtrl = async (req: any, res: Response) => {
  const user = req.user;
  console.log(user);
  try {
    const profile = await User.findOne({ _id: user.id })
      .select("-password")
      .populate("profile");

    if (!profile) {
      return res.status(404).json(new ApiResponse(404, "Profile not found"));
    }

    res.json(new ApiResponse(200, "Profile retrieved", profile));
  } catch (error: any) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

export const updateUserProfileCtrl = async (req: any, res: Response) => {
  const user = req.user;
  const id = req.params.id;

  const {
    firstName,
    lastName,
    bio,
    phoneNumber,
    billingAddress,
    shippingAddress,
    social,
  } = req.body;

  try {
    const userProfile = await Profile.findById(id);

    if (!userProfile) {
      return res.status(404).json(new ApiResponse(404, "Profile not found"));
    }

    console.log(userProfile?.user);
    console.log(userProfile?.user?.toString(), user.id);

    if (userProfile?.user?.toString() !== user.id) {
      return res.status(403).json(new ApiResponse(403, "Forbidden"));
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        bio,
        phoneNumber,
        billingAddress,
        shippingAddress,
        social,
      },
      { new: true }
    );

    if (!updatedProfile) {
      return res
        .status(500)
        .json(new ApiResponse(500, "Profile update failed"));
    }

    res.json(new ApiResponse(200, "Profile updated", updatedProfile));
  } catch (error: any) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};
