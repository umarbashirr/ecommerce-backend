import { Response } from "express";
import ApiResponse from "../utils/apiResponse";
import Brand from "../models/brand.model";

export const getAllBrandsCtrl = async (req: any, res: Response) => {
  try {
    const brands = await Brand.find();

    res
      .status(200)
      .json(new ApiResponse(200, "Brands fetched Successfully", brands));
  } catch (error: any) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

export const getBrandByIdCtrl = async (req: any, res: Response) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json(new ApiResponse(404, "Brand not found"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Brand fetched Successfully", brand));
  } catch (error: any) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

export const createBrandCtrl = async (req: any, res: Response) => {
  const { name, description } = req.body;
  const user = req.user;

  try {
    const brand = await Brand.findOne({
      name: name.toLowerCase(),
      createdBy: user.id,
    });

    if (brand) {
      return res.status(400).json(new ApiResponse(400, "Brand already exists"));
    }

    const newBrand = new Brand({
      name: name.toLowerCase(),
      description,
      createdBy: user.id,
    });

    await newBrand.save();

    res
      .status(201)
      .json(new ApiResponse(201, "Brand created Successfully", newBrand));
  } catch (error: any) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

export const updateBrandCtrl = async (req: any, res: Response) => {
  const { name, description } = req.body;
  const user = req.user;

  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json(new ApiResponse(404, "Brand not found"));
    }

    if (brand?.createdBy?.toString() !== user.id) {
      return res
        .status(403)
        .json(new ApiResponse(403, "You are not authorized to update this"));
    }

    brand.name = name.toLowerCase();
    brand.description = description;

    await brand.save();

    res
      .status(200)
      .json(new ApiResponse(200, "Brand updated Successfully", brand));
  } catch (error: any) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

export const deleteBrandCtrl = async (req: any, res: Response) => {
  const user = req.user;
  const id = req.params.id;
  try {
    const brand = await Brand.findOneAndDelete({
      _id: id,
      createdBy: user.id,
    });

    if (!brand) {
      return res.status(404).json(new ApiResponse(404, "Brand not found"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Brand deleted Successfully", brand));
  } catch (error: any) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};
