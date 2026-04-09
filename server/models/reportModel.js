import mongoose from "mongoose";

const reportSchema = mongoose.Schema(
  {
    fullName: { type: String, required: [true, "Please add your full name."] },

    contactNumber: {
      type: String,
      required: [true, "Please add your contact number."],
    },

    sitio: {
      type: String,
      required: true,
      enum: [
        "Bulaklak",
        "Centro",
        "Queensborough",
        "Paroba",
        "Paz Ville",
        "Sto. Niño",
        "Tramo",
        "Troso",
      ],
    },

    subLocation: String,
    exactLocation: String,

    incidentType: {
      type: String,
      required: true,
    },

    urgencyLevel: {
      type: String,
      enum: ["low", "medium", "high", "emergency"],
      required: true,
    },

    description: String,
    evidence: String,

    status: {
      type: String,
      enum: ["pending", "in_progress", "resolved"],
      default: "pending",
    },

    assignedTanods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    respondedAt: Date,
    responseNotes: String,
    isRead: {
      type: Boolean,
      default: false,
    },

    notifiedAt: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true },
);

export const Report = mongoose.model("Report", reportSchema);
