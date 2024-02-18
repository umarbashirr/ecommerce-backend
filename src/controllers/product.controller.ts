import { Response } from "express";
import ApiResponse from "../utils/apiResponse";
import uploadToCloudinary from "../utils/cloudinary";
import Product from "../models/product.model";

export const getAllProductsCtrl = async (req: any, res: Response) => {
  try {
    const products = await Product.find();
    return res.status(200).json(new ApiResponse(200, "Products", products));
  } catch (error: any) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

export const getProductByIdCtrl = async (req: any, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json(new ApiResponse(404, "Product not found"));
    }

    return res.status(200).json(new ApiResponse(200, "Product", product));
  } catch (error: any) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

export const createProductCtrl = async (req: any, res: Response) => {
  const { name, price, description, category, stock, brand } = req.body;

  if (!name || !price || !description || !category || !stock || !brand) {
    return res
      .status(400)
      .json(new ApiResponse(400, "All fields are required"));
  }

  if (!req.files) {
    return res.status(400).json(new ApiResponse(400, "Images are required"));
  }

  if (req.files.length > 5) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Maximum of 5 images allowed"));
  }

  const images = req.files.map((file: any) => file.path);
  const uploadedImages = await uploadToCloudinary(images);

  if (!uploadedImages) {
    return res.status(500).json(new ApiResponse(500, "Error uploading images"));
  }

  const product = new Product({
    name,
    price: parseFloat(price),
    description,
    category,
    stock: parseInt(stock),
    brand,
    images: uploadedImages.map((image: any) => image.secure_url),
    createdBy: req.user.id,
  });

  await product.save();

  return res.status(201).json(new ApiResponse(201, "Product created", product));
};

export const updateProductCtrl = async (req: any, res: Response) => {
  const { id } = req.params;
  const { name, price, description, category, stock, brand } = req.body;

  if (!name || !price || !description || !category || !stock || !brand) {
    return res
      .status(400)
      .json(new ApiResponse(400, "All fields are required"));
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json(new ApiResponse(404, "Product not found"));
    }

    if (req.files) {
      if (req.files.length > 5) {
        return res
          .status(400)
          .json(new ApiResponse(400, "Maximum of 5 images allowed"));
      }

      const images = req.files.map((file: any) => file.path);
      const uploadedImages = await uploadToCloudinary(images);

      if (!uploadedImages) {
        return res
          .status(500)
          .json(new ApiResponse(500, "Error uploading images"));
      }

      const imageUrls = uploadedImages.map((image: any) => image.secure_url);
      product.images = [...product.images, ...imageUrls];
    }

    product.name = name;
    product.price = parseFloat(price);
    product.description = description;
    product.category = category;
    product.stock = parseInt(stock);
    product.brand = brand;

    await product.save();

    return res
      .status(200)
      .json(new ApiResponse(200, "Product updated", product));
  } catch (error: any) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

export const deleteProductCtrl = async (req: any, res: Response) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json(new ApiResponse(404, "Product not found"));
    }

    if (product.createdBy?.toString() !== userId) {
      return res
        .status(403)
        .json(
          new ApiResponse(403, "You are not authorized to delete this product")
        );
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(500)
        .json(new ApiResponse(500, "Error deleting product"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Product deleted", deletedProduct));
  } catch (error: any) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};
