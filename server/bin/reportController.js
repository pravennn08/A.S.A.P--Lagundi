// import asyncHandler from "express-async-handler";
// import { Report } from "../models/reportModel.js";
// import { Schedule } from "../models/scheduleModel.js";

// // @desc    Create a report
// // @route   POST /api/add-report
// // @access  Public
// export const createReport = asyncHandler(async (req, res) => {
//   const {
//     fullName,
//     contactNumber,
//     sitio,
//     subLocation,
//     exactLocation,
//     incidentType,
//     urgencyLevel,
//     description,
//   } = req.body;

//   const evidence = req.file ? req.file.path : null;
//   const report = await Report.create({
//     fullName,
//     contactNumber,
//     sitio,
//     subLocation,
//     exactLocation,
//     incidentType,
//     urgencyLevel,
//     description,
//     evidence,
//   });

//   res.status(201).json(report);
// });

// import asyncHandler from "express-async-handler";
// import { Report } from "../models/reportModel.js";
// import { Schedule } from "../models/scheduleModel.js";

// // @desc    Create a report
// // @route   POST /api/add-report
// // @access  Public
// export const createReport = asyncHandler(async (req, res) => {
//   const {
//     fullName,
//     contactNumber,
//     sitio,
//     subLocation,
//     exactLocation,
//     incidentType,
//     urgencyLevel,
//     description,
//   } = req.body;

//   const evidenceUrl = req.file ? req.file.path : null;

//   const today = new Date().toLocaleString("en-US", {
//     weekday: "long",
//   });

//   const schedule = await Schedule.findOne({ day: today });
//   let assignedTanod = null;

//   if (schedule && schedule.assignedTanods.length > 0) {
//     assignedTanod = schedule.assignedTanods[0];
//   }

//   const report = await Report.create({
//     fullName,
//     contactNumber,
//     sitio,
//     subLocation,
//     exactLocation,
//     incidentType,
//     urgencyLevel,
//     description,
//     evidenceUrl,
//     assignedTanod,
//   });

//   res.status(201).json(report);
// });

import asyncHandler from "express-async-handler";
import { Report } from "../models/reportModel.js";
import { Schedule } from "../models/scheduleModel.js";

// @desc    Create a report
// @route   POST /api/add-report
// @access  Public
export const createReport = asyncHandler(async (req, res) => {
  const {
    fullName,
    contactNumber,
    sitio,
    subLocation,
    exactLocation,
    incidentType,
    urgencyLevel,
    description,
  } = req.body;

  const evidenceUrl = req.file ? req.file.path : null;

  // Get current day
  const today = new Date().toLocaleString("en-US", {
    weekday: "long",
  });

  const schedule = await Schedule.findOne({ day: today });

  let assignedTanods = [];

  if (schedule && schedule.assignedTanods.length > 0) {
    assignedTanods = schedule.assignedTanods;
  }

  const report = await Report.create({
    fullName,
    contactNumber,
    sitio,
    subLocation,
    exactLocation,
    incidentType,
    urgencyLevel,
    description,
    evidenceUrl,
    assignedTanods,
  });

  res.status(201).json(report);
});
