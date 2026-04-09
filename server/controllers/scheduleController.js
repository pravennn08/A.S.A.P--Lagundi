import asyncHandler from "express-async-handler";
import { Schedule } from "../models/scheduleModel.js";
import { User } from "../models/userModel.js";

// @desc    Add tanod schedule
// @route   POST /api/schedule/set-schedule
// @access   Private (Admin)
export const setTanodSchedule = asyncHandler(async (req, res) => {
  let { day, tanodIds } = req.body;

  if (!day || !tanodIds) {
    res.status(400);
    throw new Error("Day and tanod IDs are required");
  }

  if (!Array.isArray(tanodIds)) {
    tanodIds = [tanodIds];
  }

  const normalizedDay =
    day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();

  // CLEAR CASE
  if (tanodIds.length === 0) {
    await Schedule.findOneAndDelete({ day: normalizedDay });

    return res.status(200).json({
      message: "Schedule cleared",
    });
  }

  let schedule = await Schedule.findOne({ day: normalizedDay });

  if (!schedule) {
    schedule = await Schedule.create({
      day: normalizedDay,
      assignedTanods: tanodIds,
    });
  } else {
    schedule.assignedTanods = tanodIds;
    await schedule.save();
  }

  res.status(200).json({
    message: "Schedule updated",
    schedule,
  });
});

// @desc    Get tanods + assigned schedule for a specific day
// @route   GET /api/schedule?day=Monday
// @access   Private (Admin)
export const getTanodSchedule = asyncHandler(async (req, res) => {
  const { day } = req.query;

  if (!day) {
    res.status(400);
    throw new Error("Day is required");
  }

  const normalizedDay =
    day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();

  let schedule = await Schedule.findOne({ day: normalizedDay });

  // CLEAN INVALID TANODS
  if (schedule) {
    const validTanods = await User.find({
      _id: { $in: schedule.assignedTanods },
    }).select("_id");

    const validIds = validTanods.map((t) => t._id.toString());

    const cleanedIds = schedule.assignedTanods.filter((id) =>
      validIds.includes(id.toString()),
    );

    // Only update if there are invalid ones
    if (cleanedIds.length !== schedule.assignedTanods.length) {
      schedule.assignedTanods = cleanedIds;
      await schedule.save();
    }
  }

  // Populate AFTER cleaning
  schedule = await Schedule.findOne({ day: normalizedDay }).populate(
    "assignedTanods",
    "fullName contactNumber",
  );

  const allTanods = await User.find({ role: "tanod" }).select(
    "fullName contactNumber",
  );

  const assignedIds = schedule
    ? schedule.assignedTanods.map((t) => t._id.toString())
    : [];

  const formatted = allTanods.map((tanod) => ({
    id: tanod._id,
    fullName: tanod.fullName,
    contactNumber: tanod.contactNumber,
    assigned: assignedIds.includes(tanod._id.toString()),
  }));

  res.status(200).json(formatted);
});

// @desc    Get tanod count per day
// @route   GET /api/schedule/counts
// @access  Private (Admin)
export const getScheduleCounts = asyncHandler(async (req, res) => {
  const schedules = await Schedule.find();

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const counts = {};
  days.forEach((day) => (counts[day] = 0));

  for (const sched of schedules) {
    // ✅ validate IDs
    const validTanods = await User.find({
      _id: { $in: sched.assignedTanods },
    }).select("_id");

    const validIds = validTanods.map((t) => t._id.toString());

    const cleanedIds = sched.assignedTanods.filter((id) =>
      validIds.includes(id.toString()),
    );

    // 🔥 auto-clean DB
    if (cleanedIds.length !== sched.assignedTanods.length) {
      sched.assignedTanods = cleanedIds;
      await sched.save();
    }

    counts[sched.day] = cleanedIds.length;
  }

  res.status(200).json(counts);
});

// @desc    Get tanod schedule overview
// @route   GET /api/schedule/overview
// @access  Private (Admin)
export const getScheduleOverview = asyncHandler(async (req, res) => {
  const { day } = req.query;

  const normalizedDay =
    day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();

  // 🔥 1. Aggregate schedules (counts)
  const countsAgg = await Schedule.aggregate([
    {
      $project: {
        day: 1,
        count: { $size: "$assignedTanods" },
      },
    },
  ]);

  const counts = {};
  countsAgg.forEach((c) => {
    counts[c.day] = c.count;
  });

  // Get selected day schedule
  const schedule = await Schedule.findOne({ day: normalizedDay });

  const assignedIds = schedule
    ? schedule.assignedTanods.map((id) => id.toString())
    : [];

  // Get all tanods
  const tanods = await User.find({ role: "tanod" }).select(
    "fullName contactNumber",
  );

  // Format
  const formattedTanods = tanods.map((t) => ({
    id: t._id,
    fullName: t.fullName,
    contactNumber: t.contactNumber,
    assigned: assignedIds.includes(t._id.toString()),
  }));

  res.status(200).json({
    tanods: formattedTanods,
    counts,
  });
});
