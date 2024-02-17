import Category from "../models/category.model";
import ApiResponse from "../utils/apiResponse";

export const getAllCategoriesCtrl = async (req: any, res: any) => {
  try {
    const categories = await Category.find().select("-createdBy");

    res.status(200).json(new ApiResponse(200, "Success", categories));
  } catch (error: any) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

export const createCategoryCtrl = async (req: any, res: any) => {
  const { name } = req.body;
  const user = req.user;

  if (!name?.trim()) {
    return res.status(400).json(new ApiResponse(400, "Name is required"));
  }

  try {
    const category = await Category.findOne({ name: name.toLowerCase() });

    if (category) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Category already exists"));
    }

    const newCategory = new Category({
      name: name.toLowerCase(),
      createdBy: user._id,
    });

    await newCategory.save();

    res.status(201).json(new ApiResponse(201, "Category created successfully"));
  } catch (error: any) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

export const getCategoryByIdCtrl = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const category = await Category.findOne({ _id: id }).select("-createdBy");

    if (!category) {
      return res.status(404).json(new ApiResponse(404, "Category not found"));
    }

    res.status(200).json(new ApiResponse(200, "Success", category));
  } catch (error: any) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

export const updateCategoryCtrl = async (req: any, res: any) => {
  const { name } = req.body;
  const user = req.user;
  const { id } = req.params;

  if (!name?.trim()) {
    return res.status(400).json(new ApiResponse(400, "Name is required"));
  }

  try {
    const category = await Category.findOne({
      _id: id,
      user: user._id,
    });

    if (!category) {
      return res.status(404).json(new ApiResponse(404, "Category not found"));
    }

    category.name = name.toLowerCase();
    category.createdBy = user._id;

    await category.save();

    res.status(200).json(new ApiResponse(200, "Category updated successfully"));
  } catch (error: any) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

export const deleteCategoryCtrl = async (req: any, res: any) => {
  const user = req.user;
  const { id } = req.params;

  try {
    const category = await Category.findOneAndDelete({
      _id: id,
      createdBy: user._id,
    });

    if (!category) {
      return res.status(404).json(new ApiResponse(404, "Category not found"));
    }

    res.status(200).json(new ApiResponse(200, "Category deleted successfully"));
  } catch (error: any) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};
