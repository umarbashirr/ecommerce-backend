import { Response } from "express";
import Profile from "../models/profile.model";
import ApiResponse from "../utils/apiResponse";

export const getWishlistCtrl = async (req: any, res: Response) => {
  try {
    const { user } = req;

    const profile = await Profile.findOne({ user: user.id }).populate(
      "wishlist"
    );

    if (!profile) {
      return res.status(404).json(new ApiResponse(404, "Profile not found"));
    }

    res.json(new ApiResponse(200, "Wishlist retrieved", profile.wishlist));
  } catch (error: any) {
    console.error(error);
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

export const updateWishlistCtrl = async (req: any, res: Response) => {
  const { user } = req;
  const { productIds } = req.body;

  try {
    const profile = await Profile.findOne({ user: user.id });

    if (!profile) {
      return res.status(404).json(new ApiResponse(404, "Profile not found"));
    }

    profile.wishlist = productIds;

    await profile.save();

    res.status(200).json(new ApiResponse(200, "Wishlist updated successfully"));
  } catch (error: any) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};
