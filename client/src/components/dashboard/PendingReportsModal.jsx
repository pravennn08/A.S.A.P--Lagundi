import React from "react";
import { Clock3, X } from "lucide-react";

const PendingReportsModal = ({ open, onClose }) => {
  if (!open) return null;
  //replace sitioBreakdown based on prop na napass sa modal
  const sitioBreakdown = [
    { sitio: "Sitio Bulaklak", count: 8 },
    { sitio: "Sitio Sampaguita", count: 6 },
    { sitio: "Sitio Rosal", count: 4 },
    { sitio: "Sitio Orchid", count: 3 },
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
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <Clock3 className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Pending Reports Breakdown
              </h2>
              <p className="text-sm text-gray-500">
                Total pending reports per sitio
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
                      Total Pending
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                  {sitioBreakdown.length > 0 ? (
                    sitioBreakdown.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 text-gray-700">
                          {item.sitio}
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-gray-800">
                          {item.count}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={2}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No pending reports found.
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

export default PendingReportsModal;
