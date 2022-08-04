import { Router } from "express";
import { getUrlId, postUrl } from "../controllers/userController.js";
import { getUrlIdMiddleware, postUrlMiddleware, tokenValidation } from "../middlewares/userMiddleware.js";


const router = Router();

router.post("/urls/shorten", tokenValidation ,postUrlMiddleware , postUrl);
router.get("/urls/:id", getUrlIdMiddleware, getUrlId);

export default router;