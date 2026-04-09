import React from "react";
import { Card, CardContent } from "../ui/Card";

const StatCard = ({ item }) => {
  const Icon = item.icon;

  return (
    <Card className="p-6 flex justify-between min-h-[130px]">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{item.label}</p>
          <h3 className="text-3xl font-bold mt-2 text-gray-600">
            {item.value}
          </h3>
        </div>

        <div
          className={`h-12 w-12 rounded-full flex items-center justify-center ${item.iconWrap}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <p className="text-sm text-gray-500">{item.caption}</p>
    </Card>
  );
};

export default StatCard;
