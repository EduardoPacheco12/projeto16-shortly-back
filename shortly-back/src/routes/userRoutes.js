import { Router } from "express";
import { postUrl } from "../controllers/userController.js";
import { postUrlMiddleware, tokenValidation } from "../middlewares/userMiddleware.js";


const router = Router();

router.post("/urls/shorten", tokenValidation ,postUrlMiddleware , postUrl);

export default router;