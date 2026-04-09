import React from "react";
import { Info } from "lucide-react";

const AdvisoryCard = ({ title, children }) => {
  return (
    <div className="bg-[#f5f1eb] border border-orange-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-orange-100 text-orange-600 p-2 rounded-full">
          <Info size={18} />
        </div>
        <h3 className="text-sm font-semibold tracking-wide text-orange-600 uppercase">
          {title}
        </h3>
      </div>

      <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
    </div>
  );
};

export default AdvisoryCard;
