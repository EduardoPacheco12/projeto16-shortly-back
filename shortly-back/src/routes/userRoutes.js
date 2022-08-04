import { Router } from "express";
import { deleteUrl, getUrlId, postUrl, redirectUrl } from "../controllers/userController.js";
import { deleteUrlUserMiddleware, getShortUrlMiddleware, getUrlIdMiddleware, postUrlMiddleware, tokenValidation } from "../middlewares/userMiddleware.js";


const router = Router();

router.post("/urls/shorten", tokenValidation ,postUrlMiddleware , postUrl);
router.get("/urls/:id", getUrlIdMiddleware, getUrlId);
router.get("/urls/open/:shortUrl", getShortUrlMiddleware, redirectUrl);
router.delete("/urls/:id", tokenValidation, deleteUrlUserMiddleware, deleteUrl);

export default router;