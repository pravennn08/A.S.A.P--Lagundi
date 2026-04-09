import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized, no token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(401);
      throw new Error("Invalid token");
    }
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401);
    throw new Error(`Not authorized: ${err.message}`);
  }
});
