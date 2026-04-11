import React, { useState } from "react";
import Button from "../../components/ui/Button";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useReportStore } from "../../store/useReportStore";

const ReportDetailsModal = ({ report, isOpen, onClose, onStatusChange }) => {
  const BASE_URL =
    import.meta.env.MODE === "development" ? "http://localhost:5000" : "";
  const { updateReportStatus, fetchReportFeed, fetchReportStats } =
    useReportStore();

  const [selectedStatus, setSelectedStatus] = useState("");
  const [hasChanged, setHasChanged] = useState(false);

  const normalizeStatus = (status) => status.toLowerCase().replace(" ", "_");

  const formatStatusForUI = (status) => {
    if (status === "pending") return "Pending";
    if (status === "in_progress") return "In Progress";
    if (status === "resolved") return "Resolved";
    return status;
  };

  useEffect(() => {
    if (report) {
      setSelectedStatus(formatStatusForUI(report.status));
    }
  }, [report]);

  if (!isOpen || !report) return null;

  const handleStatusSelect = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);

    setHasChanged(
      normalizeStatus(newStatus) !== normalizeStatus(report.status),
    );
  };

  const handleCancel = () => {
    setSelectedStatus(formatStatusForUI(report.status));
    setHasChanged(false);
  };

  const handleUpdate = async () => {
    await updateReportStatus(report.id, selectedStatus);
    setHasChanged(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl text-gray-500 hover:text-gray-700"
        >
          ×
        </button>

        <h2 className="mb-6 text-2xl font-bold text-gray-700">
          Report Details - {report.id}
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-lg font-semibold text-gray-700">
              Reporter Information
            </h3>
            <div className="grid grid-cols-1 gap-4 border-t border-gray-300 pt-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{report.reporterName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Number</p>
                <p className="font-medium">{report.contactNumber}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold text-gray-700">
              Incident Details
            </h3>
            <div className="grid grid-cols-1 gap-4 border-t border-gray-300 pt-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">Sitio</p>
                <p className="font-medium">{report.sitio}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sub-Location</p>
                <p className="font-medium">{report.subLocation}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Exact Location</p>
                <p className="font-medium">{report.exactLocation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Incident Type</p>
                <p className="font-medium">{report.incidentType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Urgency Level</p>
                <p className="font-medium">{report.urgency}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-medium">{report.dateTime}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold text-gray-700">
              Description
            </h3>
            <div className="border-t border-gray-300 pt-4">
              <p className="text-gray-700">{report.description}</p>
            </div>
          </div>
          {report.evidence && (
            <div>
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                Evidence
              </h3>

              <div className="overflow-hidden rounded-xl border bg-gray-100">
                <img
                  src={
                    report.evidence.startsWith("http")
                      ? report.evidence
                      : `${BASE_URL}/${report.evidence}`
                  }
                  alt="evidence"
                  className="w-full h-56 object-cover"
                  onError={(e) => {
                    console.log("IMAGE FAILED:", report.evidence);
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>
          )}
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700">
              Assigned Tanods
            </h3>

            <div className="border-t border-gray-300 pt-3">
              {report.assignedTanods?.length > 0 ? (
                <ul className="space-y-1 text-gray-700">
                  {report.assignedTanods.map((t) => (
                    <li key={t.id || t}>• {t.fullName || t}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">No tanods assigned</p>
              )}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-gray-700">
              Response Management
            </h3>
            <div className="space-y-4 border-t border-gray-300 pt-4">
              <div>
                <label className="mb-2 block text-sm text-gray-500">
                  Update Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={handleStatusSelect}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              {hasChanged && (
                <div className="flex justify-end gap-3">
                  <Button onClick={handleCancel} variant="outline">
                    Cancel
                  </Button>
                  <Button onClick={handleUpdate} variant="primary">
                    Update
                  </Button>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm text-gray-500">
                  Response Notes
                </label>
                <div className="rounded-xl bg-gray-100 p-4 text-gray-700">
                  {report.responseNotes}
                </div>
              </div>

              <p className="text-sm text-gray-500">
                Responded by:{" "}
                <span className="font-medium text-gray-700">
                  {report.respondedBy}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailsModal;
