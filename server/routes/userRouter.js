import express from "express";
import {
  getAllUsers,
  updateUserStatus,
  deleteUsers,
  createUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminRoute } from "../middlewares/adminMiddleware.js";

export const userRouter = express.Router();

userRouter.get("/users", protect, adminRoute, getAllUsers);
userRouter.patch("/users/:id", protect, adminRoute, updateUserStatus);
userRouter.delete("/users/:id", protect, adminRoute, deleteUsers);
userRouter.post("/users/create", protect, adminRoute, createUser);
