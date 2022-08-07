import { Router } from "express";
import { deleteUrl, getRankings, getUrlId, getUser, postUrl, redirectUrl } from "../controllers/userController.js";
import { deleteUrlUserMiddleware, getShortUrlMiddleware, getUrlIdMiddleware, getUsersMiddleware, postUrlMiddleware, tokenValidation } from "../middlewares/userMiddleware.js";


const router = Router();

router.post("/urls/shorten", tokenValidation ,postUrlMiddleware , postUrl);
router.get("/urls/:id", getUrlIdMiddleware, getUrlId);
router.get("/urls/open/:shortUrl", getShortUrlMiddleware, redirectUrl);
router.delete("/urls/:id", tokenValidation, deleteUrlUserMiddleware, deleteUrl);
router.get("/users/me", tokenValidation, getUsersMiddleware, getUser);
router.get("/ranking", getRankings);

export default router;