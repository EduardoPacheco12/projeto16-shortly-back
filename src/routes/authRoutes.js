import { Router } from "express";
import { SignIn, SignUp } from "../controllers/authController.js";
import { SignInMiddleware, SignUpMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", SignUpMiddleware, SignUp);
router.post("/signin", SignInMiddleware , SignIn);

export default router;