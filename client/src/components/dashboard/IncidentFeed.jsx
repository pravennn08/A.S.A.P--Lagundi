import React, { useMemo, useState } from "react";
import { Card, CardTitle, CardContent } from "../ui/Card";
import Button from "../ui/Button";
import IncidentRow from "./IncidentRow";
import ReportDetailsModal from "../../components/reports/ReportDetailsModal";
import { useNavigate } from "react-router-dom";
import { useReportStore } from "../../store/useReportStore.js";

const ITEMS_PER_PAGE = 5;

const IncidentFeed = ({ incidents = [], onStatusChange }) => {
  const { fetchSingleReport, singleReport } = useReportStore();

  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(incidents.length / ITEMS_PER_PAGE));

  const paginatedIncidents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return incidents.slice(startIndex, endIndex);
  }, [incidents, currentPage]);

  const handleView = async (item) => {
    await fetchSingleReport(item.id);
    setSelectedReport(item);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedReport(null);
    setIsModalOpen(false);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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
          {paginatedIncidents.length > 0 ? (
            paginatedIncidents.map((item) => (
              <IncidentRow key={item.id} item={item} onView={handleView} />
            ))
          ) : (
            <p className="text-sm text-gray-500">No incidents found.</p>
          )}
        </CardContent>

        {incidents.length > ITEMS_PER_PAGE && (
          <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>

      <ReportDetailsModal
        report={singleReport || selectedReport}
        isOpen={isModalOpen}
        onClose={handleClose}
        onStatusChange={onStatusChange}
      />
    </>
  );
};

export default IncidentFeed;
