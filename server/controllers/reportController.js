import asyncHandler from "express-async-handler";
import { Report } from "../models/reportModel.js";
import { Schedule } from "../models/scheduleModel.js";
import { toCapitalize } from "../helpers/toCapitalize.js";
import { formatStatus } from "../helpers/formatStatus.js";
import { getIO } from "../socket/socket.js";
import path from "path";

// @desc    Create a report
// @route   POST /api/add-report
// @access  Public
export const createReport = asyncHandler(async (req, res) => {
  try {
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

    const evidence = req.file ? req.file.path : null;
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    //  Get current day
    const today = new Date().toLocaleString("en-US", {
      weekday: "long",
    });

    //  Populate tanods
    const schedule = await Schedule.findOne({ day: today }).populate(
      "assignedTanods",
      "fullName contactNumber",
    );

    //  Extract ONLY IDs for DB
    const assignedTanodIds = schedule
      ? schedule.assignedTanods.map((t) => t._id)
      : [];

    //  Save report (IDs only)
    const report = await Report.create({
      fullName,
      contactNumber,
      sitio,
      subLocation,
      exactLocation,
      incidentType,
      urgencyLevel,
      description,
      evidence,
      assignedTanods: assignedTanodIds,
    });

    //  Format tanods
    const formattedTanods = schedule
      ? schedule.assignedTanods.map((t) => ({
          id: t._id,
          fullName: t.fullName,
          contactNumber: t.contactNumber,
        }))
      : [];

    //  Final formatted report (for socket)
    const formattedReport = {
      id: report._id,
      fullName: report.fullName,
      contactNumber: report.contactNumber,
      sitio: report.sitio,
      subLocation: report.subLocation,
      exactLocation: report.exactLocation,
      incidentType: report.incidentType,
      urgencyLevel: report.urgencyLevel,
      status: report.status,
      description: report.description,
      evidence: report.evidence
        ? `${baseUrl}/uploads/${path.basename(report.evidence)}`
        : null,
      assignedTanods: formattedTanods,
      createdAt: report.createdAt,
    };

    // Emit real-time
    const io = getIO();
    io.emit("new-report", formattedReport);

    res.status(201).json(report);
  } catch (error) {
    console.log("CREATE REPORT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Fetch all reports
// @route   GET /api/report/
// @access  Private
export const getAllReports = asyncHandler(async (req, res) => {
  try {
    const reports = await Report.find()
      .sort({ createdAt: -1 })
      .populate("respondedBy", "fullName");

    const formatted = reports.map((report, index) => {
      const date = new Date(report.createdAt);

      return {
        id: report._id,
        dateTime: date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),

        fullDateTime: date.toLocaleString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),

        sitio: report.sitio,
        subLocation: report.subLocation,
        exactLocation: report.exactLocation,

        incidentType: report.incidentType,

        urgency: toCapitalize(report.urgencyLevel),

        status: formatStatus(report.status),

        reporterName: report.fullName,
        contactNumber: report.contactNumber,

        description: report.description,

        respondedBy: report.respondedBy?.fullName || "N/A",
      };
    });

    res.status(200).json(formatted);
  } catch (error) {
    console.log("GET ALL REPORTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// // @desc    Fetch dashboard stats
// // @route   GET /api/report/stats
// // @access  Private
export const getReportStats = asyncHandler(async (req, res) => {
  const totalReports = await Report.countDocuments();

  const pending = await Report.countDocuments({ status: "pending" });
  const inProgress = await Report.countDocuments({ status: "in_progress" });
  const resolved = await Report.countDocuments({ status: "resolved" });

  const responded = inProgress + resolved;

  // Top Reporting Area
  const topArea = await Report.aggregate([
    {
      $group: {
        _id: "$sitio",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ]);

  // Most Common Incident
  const topIncident = await Report.aggregate([
    {
      $group: {
        _id: "$incidentType",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ]);

  res.status(200).json({
    totalReports,
    pending,
    responded,
    resolved,

    topArea: topArea[0] || null,
    topIncident: topIncident[0] || null,
  });
});

// @desc    Fetch latest reports (real-time feed)
// @route   GET /api/report/feed
// @access  Private
export const getReportFeed = asyncHandler(async (req, res) => {
  try {
    const reports = await Report.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("respondedBy", "fullName");

    const formatted = reports.map((report, index) => {
      const date = new Date(report.createdAt);

      return {
        id: report._id,

        dateTime: date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),

        fullDateTime: date.toLocaleString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),

        sitio: report.sitio || "N/A",
        subLocation: report.subLocation || "",
        exactLocation: report.exactLocation || "",

        incidentType: report.incidentType || "N/A",
        reporterName: report.fullName || "N/A",
        contactNumber: report.contactNumber || "N/A",

        responseNotes: "No notes yet",
        respondedBy: report.respondedBy?.fullName || "N/A",

        status: report.status,
        urgencyLevel: report.urgencyLevel,
        isEmergency: report.urgencyLevel === "emergency",

        location: `${report.sitio || "N/A"} - ${report.subLocation || ""}`,
        incident: report.incidentType || "N/A",

        urgency: toCapitalize(report.urgencyLevel),

        time: date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),

        description: report.description || "",
      };
    });

    res.status(200).json(formatted);
  } catch (error) {
    console.log("FEED ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Read a single report
// @route   GET /api/report/:id
// @access  Private
export const getSingleReport = asyncHandler(async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate("respondedBy", "fullName")
      .populate("assignedTanods", "fullName contactNumber");

    if (!report) {
      res.status(404);
      throw new Error("Report not found");
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const date = new Date(report.createdAt);

    const formatted = {
      id: report._id,
      reporterName: report.fullName,
      contactNumber: report.contactNumber,

      sitio: report.sitio,
      subLocation: report.subLocation,
      exactLocation: report.exactLocation,

      incidentType: report.incidentType,
      urgency: toCapitalize(report.urgencyLevel),

      description: report.description,

      evidence: report.evidence
        ? `${baseUrl}/uploads/${path.basename(report.evidence)}`
        : null,

      assignedTanods:
        report.assignedTanods?.map((t) => ({
          id: t._id,
          fullName: t.fullName,
          contactNumber: t.contactNumber,
        })) || [],

      dateTime: date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),

      fullDateTime: date.toLocaleString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),

      status: report.status,
      respondedBy: report.respondedBy?.fullName || "N/A",

      responseNotes: "No notes yet",
    };

    res.status(200).json(formatted);
  } catch (error) {
    console.log("SINGLE REPORT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update report status
// @route   PATCH /api/report/:id
// @access  Private
export const updateReportStatus = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;

    const report = await Report.findById(req.params.id);

    if (!report) {
      res.status(404);
      throw new Error("Report not found");
    }

    // Normalize status
    const normalizeStatus = (status) => {
      if (status === "Pending") return "pending";
      if (status === "In Progress") return "in_progress";
      if (status === "Resolved") return "resolved";
      return status;
    };

    report.status = normalizeStatus(status);

    // Optional tracking
    report.respondedAt = new Date();

    await report.save();

    res.status(200).json({
      message: "Status updated",
      status: report.status,
    });
  } catch (error) {
    console.log("UPDATE STATUS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get report notification stats
// @route   PATCH /api/report/notifications/stats
// @access  Private
export const getNotificationStats = asyncHandler(async (req, res) => {
  try {
    // TOTAL REPORTS
    const total = await Report.countDocuments();

    // EMERGENCY REPORTS
    const emergency = await Report.countDocuments({
      urgencyLevel: "emergency",
    });

    // UPDATES (recently updated reports)
    const updates = await Report.countDocuments({
      updatedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // last 24 hrs
    });

    // SCHEDULE (active schedules)
    const schedule = await Schedule.countDocuments();

    res.status(200).json({
      total,
      emergency,
      updates,
      schedule,
    });
  } catch (error) {
    console.log("NOTIFICATION STATS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get report notification
// @route   GET /api/report/notifications
// @access  Private
export const getNotifications = asyncHandler(async (req, res) => {
  try {
    const reports = await Report.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("respondedBy", "fullName");

    const notifications = reports.map((r) => ({
      id: r._id,
      title: `${r.incidentType} reported`,
      message: `${r.sitio} - ${r.subLocation}`,
      isRead: r.isRead,
      responded: !!r.respondedBy,

      respondedBy: r.respondedBy?.fullName || null,
    }));

    res.json(notifications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get report mark notification as read
// @route   GET /api/report/notifications/:id/read
// @access  Private
export const markNotificationAsRead = asyncHandler(async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      res.status(404);
      throw new Error("Notification not found");
    }

    report.isRead = true;
    await report.save();

    res.json({ message: "Marked as read" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update report whos responded
// @route   PATCH /api/report/:id/respond
// @access  Private
export const updateRespondedReport = asyncHandler(async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      res.status(404);
      throw new Error("Report not found");
    }

    // Prevent double respond
    if (report.respondedBy) {
      return res.status(400).json({
        message: "Already responded by another user",
      });
    }

    // Assign responder
    report.respondedBy = req.userId;
    report.respondedAt = new Date();
    report.status = "in_progress";

    await report.save();

    const populated = await report.populate("respondedBy", "fullName");

    res.status(200).json({
      id: populated._id,
      respondedBy: populated.respondedBy.fullName,
      respondedAt: populated.respondedAt,
      status: populated.status,
    });
  } catch (error) {
    console.log("RESPOND ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});
