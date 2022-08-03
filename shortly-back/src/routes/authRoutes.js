import { Router } from "express";
import { SignIn, SignUp } from "../controllers/authController.js";
import { SignUpMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", SignUpMiddleware, SignUp);
router.post("/signin", SignIn);

export default router;