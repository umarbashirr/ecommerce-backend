import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyToken.middleware";
import {
  getUserProfileCtrl,
  updateUserProfileCtrl,
} from "../controllers/user.controller";

const router = Router();

router.use(verifyJWT);

router.route("/me").get(getUserProfileCtrl);
router.route("/me/:id").put(updateUserProfileCtrl);

export default router;
