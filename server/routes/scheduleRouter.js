import express from "express";
import {
  setTanodSchedule,
  getTanodSchedule,
  getScheduleCounts,
  getScheduleOverview,
} from "../controllers/scheduleController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminRoute } from "../middlewares/adminMiddleware.js";

export const scheduleRouter = express.Router();

scheduleRouter.post("/set-schedule", protect, adminRoute, setTanodSchedule);
scheduleRouter.get("/", protect, adminRoute, getTanodSchedule);
scheduleRouter.get("/counts", protect, adminRoute, getScheduleCounts);
scheduleRouter.get("/overview", protect, adminRoute, getScheduleOverview);
