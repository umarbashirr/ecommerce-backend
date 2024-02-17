import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    health: "ok",
    message: "Hello from Express! 🎉",
  });
});

export default router;
