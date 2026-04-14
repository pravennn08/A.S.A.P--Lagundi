import React from "react";
import { X } from "lucide-react";
import { TbReportAnalytics } from "react-icons/tb";

const SitioReportsModal = ({ open, onClose, sitioReports = [] }) => {
  if (!open) return null;

  //replace sitioBreakdown based on prop na napass sa modal

  const sitioBreakdown = [
    { sitio: "Bulaklak", count: 4 },
    { sitio: "Centro", count: 2 },
    { sitio: "Queensborough", count: 3 },
    { sitio: "Paroba", count: 1 },
    { sitio: "Paz Ville", count: 4 },
    { sitio: "Sto. Niño", count: 2 },
    { sitio: "Tramo", count: 3 },
    { sitio: "Troso", count: 1 },
  ];

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 py-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <TbReportAnalytics className="h-7 w-7" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Sitio Reports Breakdown
              </h2>
              <p className="text-sm text-gray-500">
                View all reported incidents by sitio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Table */}
        <div className="px-6 pb-6">
          <div className="overflow-hidden rounded-xl">
            <div className="max-h-[420px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white border-b border-gray-400">
                  <tr>
                    <th className="px-4 py-3 text-left text-lg font-bold text-gray-700">
                      Sitio
                    </th>
                    <th className="px-4 py-3 text-right text-lg font-bold text-gray-700">
                      Total Reports
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                  {sitioBreakdown.length > 0 ? (
                    sitioBreakdown.map((sitio, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 text-gray-700">
                          {sitio.sitio || sitio._id || "Unknown Sitio"}
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-gray-800">
                          {sitio.count ?? 0}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={2}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No sitio reports found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitioReportsModal;
