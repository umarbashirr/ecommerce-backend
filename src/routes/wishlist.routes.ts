import { Router } from "express";
import {
  getWishlistCtrl,
  updateWishlistCtrl,
  deleteWishlistCtrl,
} from "../controllers/wishlist.controller";
import { verifyJWT } from "../middlewares/verifyToken.middleware";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getWishlistCtrl).put(updateWishlistCtrl);
router.route("/:id").delete(deleteWishlistCtrl);

export default router;
