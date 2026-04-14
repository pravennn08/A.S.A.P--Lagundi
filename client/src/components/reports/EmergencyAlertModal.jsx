import { AlertTriangle, X, MapPin, User, FileText, Clock } from "lucide-react";

const URGENCY_CONFIG = {
  emergency: {
    bgHeader: "bg-red-600",
    border: "border-red-200",
    bgBox: "bg-red-50",
    badge: "bg-red-100 text-red-700",
    title: "Emergency Alert",
    text: "Immediate threat to life, limb, or property",
  },
  high: {
    bgHeader: "bg-orange-500",
    border: "border-orange-200",
    bgBox: "bg-orange-50",
    badge: "bg-orange-100 text-orange-700",
    title: "High Priority Alert",
    text: "Serious situation, may escalate",
  },
  moderate: {
    bgHeader: "bg-yellow-500",
    border: "border-yellow-200",
    bgBox: "bg-yellow-50",
    badge: "bg-yellow-100 text-yellow-700",
    title: "Moderate Alert",
    text: "Non-violent issue affecting peace",
  },
  low: {
    bgHeader: "bg-green-600",
    border: "border-green-200",
    bgBox: "bg-green-50",
    badge: "bg-green-100 text-green-700",
    title: "Low Priority",
    text: "Minor nuisance or administrative issue",
  },
  other: {
    bgHeader: "bg-blue-600",
    border: "border-blue-200",
    bgBox: "bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
    title: "General Report",
    text: "Does not fall under any predefined safety/legal category",
  },
};

const getUrgencyLevel = (emergency) => {
  const priority = emergency?.priority?.toLowerCase();

  if (priority === "red") return "emergency";
  if (priority === "orange") return "high";
  if (priority === "yellow") return "moderate";
  if (priority === "green") return "low";
  return "other";
};

const formatDate = (date) => {
  if (!date) return "N/A";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "N/A";

  return parsed.toLocaleString();
};

const EmergencyAlertModal = ({ isOpen, emergency, onClose, onView }) => {
  if (!isOpen || !emergency) return null;

  const level = getUrgencyLevel(emergency);
  const config = URGENCY_CONFIG[level];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 backdrop-blur-xs  px-4 pt-16">
      <div
        className={`w-full max-w-3xl overflow-hidden rounded-2xl  bg-white shadow-2xl`}
      >
        <div
          className={`flex items-center justify-between px-5 py-4 text-white ${config.bgHeader}`}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6" />
            <div>
              <h2 className="text-lg font-bold">{config.title}</h2>
              <p className="text-sm text-white/90">{config.text}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-md p-1 transition hover:bg-white/20"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                Ref: {emergency.id || "#"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{formatDate(emergency.createdAt)}</span>
            </div>
          </div>

          <div
            className={`rounded-xl border ${config.border} ${config.bgBox} p-4`}
          >
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Type of Incident
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {emergency.title || "Report"}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FileText className="h-4 w-4" />
                  Description
                </p>
                <p className="text-sm leading-6 text-gray-600">
                  {emergency.message || "No details provided."}
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <MapPin className="h-4 w-4" />
                    Location
                  </p>
                  <p className="text-sm text-gray-600">
                    {emergency.location || "No location provided"}
                  </p>
                </div>

                <div>
                  <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <User className="h-4 w-4" />
                    Reported By
                  </p>
                  <p className="text-sm text-gray-600">
                    {emergency.reportedBy || "Unknown reporter"}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-sm font-semibold text-gray-700">
                    Status
                  </p>
                  <p className="text-sm text-gray-600">
                    {emergency.status || "Pending review"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              onClick={onView}
              className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 ${config.bgHeader}`}
            >
              View More Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlertModal;
