import { verifyJWT } from "./../middlewares/verifyToken.middleware";
import { Router } from "express";
import {
  getAllBrandsCtrl,
  getBrandByIdCtrl,
  createBrandCtrl,
  updateBrandCtrl,
  deleteBrandCtrl,
} from "../controllers/brand.controller";

const router = Router();

router.route("/").get(getAllBrandsCtrl);
router.route("/:id").get(getBrandByIdCtrl);
router.route("/").post(verifyJWT, createBrandCtrl);
router.route("/:id").put(verifyJWT, updateBrandCtrl);
router.route("/:id").delete(verifyJWT, deleteBrandCtrl);

export default router;
