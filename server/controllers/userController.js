import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import { toCapitalize } from "../helpers/toCapitalize.js";

//desc    Get all a users
//route   GET api/users
//access  Private
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  const formattedUsers = users.map((user) => ({
    id: user._id.toString(),
    fullName: user.fullName,
    username: user.username,
    role: toCapitalize(user.role),
    contactNumber: user.contactNumber || "",
    status: toCapitalize(user.status),
    createdAt: user.createdAt,
  }));

  res.json(formattedUsers);
});

//desc    Update user status
//route   PATCH api/users/:id
//access  Private
export const updateUserStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const normalized = status.toLowerCase().replace(" ", "_");

  const user = await User.findOneAndUpdate(
    { _id: req.params.id },
    { status: normalized },
    { new: true },
  ).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json(user);
});

//desc    Delete user
//route   DELETE api/users/:id
//access  Private
export const deleteUsers = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json({
    message: "User deleted successfully",
    id: req.params.id,
  });
});

//desc    Create user (Admin)
//route   POST api/users/create
//access  Private (Admin)
export const createUser = asyncHandler(async (req, res) => {
  const { fullName, username, password, role, contactNumber, status } =
    req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    fullName,
    username,
    password,
    role,
    contactNumber,
    status,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.status(201).json({
    id: user._id.toString(),
    fullName: user.fullName,
    username: user.username,
    role: user.role,
    contactNumber: user.contactNumber || "",
    status: user.status,
    createdAt: user.createdAt,
  });
});
