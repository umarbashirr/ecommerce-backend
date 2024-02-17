import { Router } from "express";
import {
  createProductCtrl,
  deleteProductCtrl,
  getAllProductsCtrl,
  getProductByIdCtrl,
  updateProductCtrl,
} from "../controllers/product.controller";

const router = Router();

router.route("/").get(getAllProductsCtrl);
router.route("/:id").get(getProductByIdCtrl);
router.route("/").post(createProductCtrl);
router.route("/:id").put(updateProductCtrl);
router.route("/:id").delete(deleteProductCtrl);

export default router;
