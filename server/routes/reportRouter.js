import express from "express";
import {
  createReport,
  getAllReports,
  getReportStats,
  getReportFeed,
  getSingleReport,
  updateReportStatus,
  getNotificationStats,
  getNotifications,
  markNotificationAsRead,
  updateRespondedReport,
} from "../controllers/reportController.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { reportRateLimiter } from "../middlewares/rateLimiterMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";

export const reportRouter = express.Router();

reportRouter.post(
  "/create",
  reportRateLimiter,
  upload.single("evidence"),
  createReport,
);
reportRouter.get("/", protect, getAllReports);
reportRouter.get("/stats", protect, getReportStats);
reportRouter.get("/feed", protect, getReportFeed);
reportRouter.patch("/:id", protect, updateReportStatus);
reportRouter.get("/notifications/stats", protect, getNotificationStats);
reportRouter.get("/notifications", protect, getNotifications);
reportRouter.patch("/notifications/:id/read", protect, markNotificationAsRead);
reportRouter.get("/:id", protect, getSingleReport);
reportRouter.patch("/:id/respond", protect, updateRespondedReport);
