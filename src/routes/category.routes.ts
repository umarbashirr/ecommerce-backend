import { Router } from "express";
import {
  createCategoryCtrl,
  deleteCategoryCtrl,
  getAllCategoriesCtrl,
  getCategoryByIdCtrl,
  updateCategoryCtrl,
} from "../controllers/category.controller";
import { verifyJWT } from "../middlewares/verifyToken.middleware";

const router = Router();

router.get("/", getAllCategoriesCtrl);
router.post("/", verifyJWT, createCategoryCtrl);
router.get("/:id", getCategoryByIdCtrl);
router.put("/:id", verifyJWT, updateCategoryCtrl);
router.delete("/:id", verifyJWT, deleteCategoryCtrl);

export default router;
