import React from "react";
import { Card } from "../ui/Card";

const OverviewCard = ({ icon, title, value, subtitle }) => {
  const Icon = icon;

  return (
    <Card className="p-6 flex flex-col justify-between min-h-[150px]">
      <div className="flex items-center gap-2 text-gray-700">
        <Icon className="w-5 h-5" />
        <h3 className="font-semibold">{title}</h3>
      </div>

      <div>
        <p className="text-3xl font-bold text-gray-700">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
    </Card>
  );
};

export default OverviewCard;
