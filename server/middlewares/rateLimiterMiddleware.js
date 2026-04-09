import rateLimit from "express-rate-limit";

// Auth Limiter
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 attempts
  message: {
    message: "Too many login attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Report limiter
export const reportRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // max 10 reports
  message: {
    message: "Too many reports submitted. Please slow down.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
