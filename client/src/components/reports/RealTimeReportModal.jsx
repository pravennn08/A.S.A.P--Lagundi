// import { X, MapPin, AlertTriangle } from "lucide-react";

// const RealTimeReportModal = ({ report, onClose }) => {
//   if (!report) return null;
//   console.log("IMAGE URL:", report.evidence);

//   return (
//     <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-md">
//       <div className="bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden animate-slideDown">
//         {/* Header */}
//         <div className="flex items-center justify-between px-4 py-3 bg-red-500 text-white">
//           <div className="flex items-center gap-2">
//             <AlertTriangle size={18} />
//             <span className="font-semibold">New Emergency Report</span>
//           </div>

//           <button onClick={onClose}>
//             <X size={18} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-4 space-y-3 text-sm text-gray-700">
//           <p>
//             <strong>Reporter:</strong> {report.fullName}
//           </p>
//           <p>
//             <strong>Contact:</strong> {report.contactNumber}
//           </p>

//           <div className="flex items-center gap-2 text-gray-600">
//             <MapPin size={16} />
//             <span>
//               {report.sitio} - {report.subLocation}
//             </span>
//           </div>

//           <p>
//             <strong>Incident:</strong> {report.incidentType}
//           </p>
//           {report.evidence ? (
//             <div className="w-full overflow-hidden rounded-lg border bg-gray-100">
//               <img
//                 src={
//                   report.evidence.startsWith("http")
//                     ? report.evidence.replace("5173", "5000")
//                     : `http://localhost:5000/${report.evidence}`
//                 }
//                 alt="evidence"
//                 className="w-full h-48 object-cover"
//                 onError={(e) => {
//                   console.log("❌ IMAGE LOAD FAILED:", report.evidence);
//                   e.target.style.display = "none";
//                 }}
//               />
//             </div>
//           ) : (
//             <p className="text-xs text-gray-400">No image provided</p>
//           )}
//           <p>
//             <strong>Urgency:</strong>
//             <span className="ml-1 text-red-500 font-semibold uppercase">
//               {report.urgencyLevel}
//             </span>
//           </p>
//           <p>
//             <strong>Descriptiom:</strong>
//             <p className="text-gray-600">{report.description}</p>
//           </p>
//           <p>
//             <strong>Assign Tanod{"s"}</strong>

//             <ul className="text-sm text-gray-600">
//               {report.assignedTanods.map((t) => (
//                 <li key={t.id}>• {t.fullName}</li>
//               ))}
//             </ul>
//           </p>

//           <p className="text-xs text-gray-400">
//             {new Date(report.createdAt).toLocaleString()}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RealTimeReportModal;

import {
  X,
  MapPin,
  AlertTriangle,
  User,
  Phone,
  Clock,
  Shield,
  Image as ImageIcon,
  Send,
} from "lucide-react";
import { useState, useEffect } from "react";

const RealTimeReportModal = ({ report, onClose, onRespond }) => {
  const [isResponding, setIsResponding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!report) return null;

  const getUrgencyColor = (level) => {
    switch (level?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getImageUrl = (evidence) => {
    if (!evidence) return null;
    if (evidence.startsWith("http")) {
      return evidence.replace("5173", "5000");
    }
    return `http://localhost:5000/${evidence}`;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-slideUp overflow-hidden">
          {/* Header */}
          <div className="relative px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 animate-ping bg-red-400 rounded-full opacity-75"></div>
                <div className="relative w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Emergency Report
              </h2>
            </div>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[70vh] overflow-y-auto">
            <div className="p-6 space-y-5">
              {/* Reporter Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <User size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Reporter</p>
                    <p className="font-medium text-gray-900">
                      {report.fullName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Phone size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Contact</p>
                    <p className="font-medium text-gray-900">
                      {report.contactNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 text-sm">
                <div className="p-2 bg-red-50 rounded-lg mt-0.5">
                  <MapPin size={16} className="text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">
                    {report.sitio}
                    {report.subLocation ? `, ${report.subLocation}` : ""}
                  </p>
                </div>
              </div>

              {/* Incident Type & Urgency */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Incident Type</p>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">
                      {report.incidentType}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Urgency Level</p>
                  <div
                    className={`px-3 py-2 rounded-lg ${getUrgencyColor(report.urgencyLevel)}`}
                  >
                    <p className="text-sm font-semibold uppercase">
                      {report.urgencyLevel}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Description</p>
                <div className="px-3 py-2 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {report.description || "No description provided"}
                  </p>
                </div>
              </div>

              {/* Evidence Image */}
              {report.evidence ? (
                <div>
                  <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                    <ImageIcon size={12} /> Evidence
                  </p>
                  <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                    {!imageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                        <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                      </div>
                    )}
                    <img
                      src={getImageUrl(report.evidence)}
                      alt="Evidence"
                      className={`w-full h-56 object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                      onLoad={() => setImageLoaded(true)}
                      onError={(e) => {
                        console.error("Image load failed:", report.evidence);
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML = `
                          <div class="flex flex-col items-center justify-center h-56 text-gray-400">
                            <ImageIcon size={32} />
                            <p class="text-sm mt-2">Failed to load image</p>
                          </div>
                        `;
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 py-8 bg-gray-50 rounded-xl border border-gray-200">
                  <ImageIcon size={20} className="text-gray-400" />
                  <p className="text-sm text-gray-500">No image provided</p>
                </div>
              )}

              {/* Assigned Tanods */}
              {report.assignedTanods?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                    <Shield size={12} /> Assigned Personnel
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {report.assignedTanods.map((tanod) => (
                      <span
                        key={tanod.id}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                      >
                        {tanod.fullName}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Timestamp */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <Clock size={14} className="text-gray-400" />
                <p className="text-xs text-gray-500">
                  Reported {new Date(report.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <button
              onClick={() => {
                setIsResponding(true);
                if (onRespond) {
                  onRespond(report).finally(() => setIsResponding(false));
                }
              }}
              disabled={isResponding || report.respondedBy}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all
                  ${
                    report.respondedBy
                      ? "bg-green-100 text-green-600 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }
                `}
            >
              {report.respondedBy ? "Already Responded" : "Respond to Report"}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default RealTimeReportModal;
