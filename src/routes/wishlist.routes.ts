import { Router } from "express";
import {
  getWishlistCtrl,
  updateWishlistCtrl,
  deleteWishlistCtrl,
} from "../controllers/wishlist.controller";

const router = Router();

router.route("/").get(getWishlistCtrl).put(updateWishlistCtrl);
router.route("/:id").delete(deleteWishlistCtrl);

export default router;
