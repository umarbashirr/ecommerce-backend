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
router.route("/").post(createBrandCtrl);
router.route("/:id").put(updateBrandCtrl);
router.route("/:id").delete(deleteBrandCtrl);

export default router;
