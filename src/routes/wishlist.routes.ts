import { Router } from "express";
import {
  getWishlistCtrl,
  updateWishlistCtrl,
} from "../controllers/wishlist.controller";
import { verifyJWT } from "../middlewares/verifyToken.middleware";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getWishlistCtrl).patch(updateWishlistCtrl);

export default router;
