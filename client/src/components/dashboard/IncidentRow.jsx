import React from "react";
import Button from "../ui/Button";

const getStatusTone = (status) => {
  if (status === "pending") return "bg-amber-100 text-amber-600";
  if (status === "in_progress") return "bg-blue-100 text-blue-600";
  if (status === "resolved") return "bg-green-100 text-green-600";
  return "bg-gray-100 text-gray-600";
};

const formatStatus = (status) => {
  if (status === "pending") return "Pending";
  if (status === "in_progress") return "In Progress";
  if (status === "resolved") return "Resolved";
  return status;
};

const IncidentRow = ({ item, onView }) => {
  return (
    <div className="border border-gray-300 rounded-xl p-5 bg-white">
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-semibold text-lg">{item.id}</span>

            {item.isEmergency && (
              <span className="text-xs px-3 py-1 rounded bg-red-500 text-white">
                EMERGENCY
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-4 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold">{item.location}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Incident</p>
              <p className="font-semibold">{item.incident}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Urgency</p>
              <p className="font-semibold">{item.urgency}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-semibold">{item.time}</p>
            </div>
          </div>

          <p className="text-gray-600 mt-3">{item.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded ${getStatusTone(item.status)}`}>
            {formatStatus(item.status)}
          </span>
          <Button variant="outline" onClick={() => onView(item)}>
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IncidentRow;
