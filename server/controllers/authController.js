import asyncHandler from "express-async-handler";
import crypto from "crypto";
import { User } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { resetTokenExpiresAt } from "../utils/resetTokenExpiresAt.js";

//desc    Login a user
//route   POST api/auth/login
//access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const normalizedUsername = username.toLowerCase();
  const user = await User.findOne({
    username: normalizedUsername,
  }).select("+password");

  if (!user) {
    res.status(401);
    throw new Error("Invalid username or password");
  }

  if (user.status === "inactive") {
    res.status(403);
    throw new Error("User is inactive");
  }

  const isMatch = await user.matchPasswords(password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid username or password");
  }
  generateToken(res, user._id);
  res.status(200).json({
    message: "Login successful",
    user: {
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      role: user.role,
    },
  });
});

//desc    Admin resets tanod password
//route   POST api/auth/forgot-password
//access  Private (Admin only)
export const forgotPassword = asyncHandler(async (req, res) => {
  const { username } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.role === "admin") {
    res.status(403);
    throw new Error("Cannot reset admin password");
  }
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash token
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpiresAt = resetTokenExpiresAt();

  await user.save();

  res.status(200).json({
    message: "Reset token generated",
    resetToken,
  });
});

//desc    Check user authentication
//route   GET api/auth/check-auth
//access  Private
export const checkUserAuth = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }
    res.status(200).json({ message: "User authenticated", user });
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

//desc    Update user information
//route   PUT /api/auth/:id
//access  Private
export const updateUser = asyncHandler(async (req, res) => {
  const { fullName, username, contactNumber } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Update only allowed fields
  user.fullName = fullName || user.fullName;
  user.username = username || user.username;
  user.contactNumber = contactNumber || user.contactNumber;

  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    user: updatedUser,
  });
});

//desc    Reset user password
//route   PATCH /api/users/reset-password
//access  Private
export const resetPassword = asyncHandler(async (req, res) => {
  const { newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    res.status(400);
    throw new Error("Please provide all fields");
  }

  if (newPassword !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  const user = await User.findById(req.userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

//desc    Logout a user
//route   POST api/auth/logout
//access  Public
export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});
