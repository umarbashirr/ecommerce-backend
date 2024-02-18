import { Router } from "express";
import {
  createProductCtrl,
  deleteProductCtrl,
  getAllProductsCtrl,
  getProductByIdCtrl,
  updateProductCtrl,
} from "../controllers/product.controller";
import { upload } from "../middlewares/multer.middleware";
import { verifyJWT } from "../middlewares/verifyToken.middleware";

const router = Router();

router.route("/").get(getAllProductsCtrl);
router.route("/:id").get(getProductByIdCtrl);
router.route("/").post(verifyJWT, upload.array("images"), createProductCtrl);
router.route("/:id").put(updateProductCtrl);
router.route("/:id").delete(deleteProductCtrl);

export default router;
