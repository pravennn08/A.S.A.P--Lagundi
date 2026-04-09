import React, { useState } from "react";
import { Card, CardTitle, CardContent } from "../ui/Card";
import Button from "../ui/Button";
import IncidentRow from "./IncidentRow";
import ReportDetailsModal from "../../components/reports/ReportDetailsModal";
import { useNavigate } from "react-router-dom";
import { useReportStore } from "../../store/useReportStore.js";

const IncidentFeed = ({ incidents, onStatusChange }) => {
  const { fetchSingleReport, singleReport } = useReportStore();

  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = async (item) => {
    await fetchSingleReport(item.id);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedReport(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Real-Time Incident Feed</CardTitle>
            <p className="text-sm text-gray-500">Latest reported incidents</p>
          </div>

          <Button variant="outline" onClick={() => navigate("/admin/reports")}>
            View All
          </Button>
        </div>

        <CardContent className="mt-4 space-y-4">
          {incidents.map((item) => (
            <IncidentRow key={item.id} item={item} onView={handleView} />
          ))}
        </CardContent>
      </Card>

      <ReportDetailsModal
        report={singleReport}
        isOpen={isModalOpen}
        onClose={handleClose}
        onStatusChange={onStatusChange}
      />
    </>
  );
};

export default IncidentFeed;
