import { User } from "../models/userModel.js";

export const adminRoute = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied - Admin only" });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
