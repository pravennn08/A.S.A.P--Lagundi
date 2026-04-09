import express from "express";
import {
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  checkUserAuth,
  updateUser,
} from "../controllers/authController.js";

import { adminRoute } from "../middlewares/adminMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authRateLimiter } from "../middlewares/rateLimiterMiddleware.js";

export const authRouter = express.Router();

authRouter.get("/check-auth", protect, checkUserAuth);
authRouter.post("/login", authRateLimiter, loginUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/forgot-password", protect, adminRoute, forgotPassword);
authRouter.put("/:id", protect, updateUser);
authRouter.patch("/reset-password", protect, resetPassword);
