import { useMemo, useState, useEffect } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Eye,
  MapPin,
  Calendar,
} from "lucide-react";
import ReportDetailsModal from "../../components/reports/ReportDetailsModal";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useReportStore } from "../../store/useReportStore";
import Spinner from "../../utils/Spinner";
import { useLocation } from "react-router-dom";
import ReportsFilters from "../../components/filters/ReportsFilters";

const statusOptions = ["All Status", "Pending", "In Progress", "Resolved"];

const sitioOptions = {
  Bulaklak: ["Bulaklak", "Bulaklak Gubat"],
  Centro: ["Centro", "Jasa Main Road", "Beverly Place", "El Grande"],
  Queensborough: ["Queensborough"],
  Paroba: ["Paroba", "Parobang Gubat"],
  "Paz Ville": ["Paz Ville"],
  "Sto. Niño": ["Sto. Niño"],
  Tramo: ["Tramo"],
  Troso: ["Looban", "Riverside", "Vista Roma", "The Belle Enclaves"],
};

const urgencyDotColors = {
  High: "bg-orange-500",
  Emergency: "bg-red-500",
  Medium: "bg-yellow-500",
};

const statusBadgeStyles = {
  "In Progress": "bg-blue-100 text-blue-700",
  Resolved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const REPORTS_PER_PAGE = 10;

const ReportsManagement = () => {
  const location = useLocation();
  const {
    reports,
    fetchReports,
    updateReportStatus,
    isLoading,
    fetchSingleReport,
  } = useReportStore();

  const [selectedReport, setSelectedReport] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sitioFilter, setSitioFilter] = useState("All Sitios");

  const [subLocationFilter, setSubLocationFilter] =
    useState("All Sub-locations");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    const openReportId = location.state?.openReportId;
    if (!openReportId || reports.length === 0) return;

    const matchedReport = reports.find((report) => report.id === openReportId);
    if (!matchedReport) return;

    handleView(matchedReport);

    window.history.replaceState({}, document.title);
  }, [location.state, reports]);

  const availableSubLocations =
    sitioFilter !== "All Sitios" ? sitioOptions[sitioFilter] || [] : [];

  const handleView = async (report) => {
    await fetchSingleReport(report.id);
    setSelectedReport(useReportStore.getState().singleReport);
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateReportStatus(id, newStatus);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All Status");
    setSitioFilter("All Sitios");
    setSubLocationFilter("All Sub-locations");
    setDateFrom("");
    setDateTo("");
    setCurrentPage(1);
  };

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const term = searchTerm.toLowerCase();

      const matchesSearch =
        report.id.toLowerCase().includes(term) ||
        report.incidentType.toLowerCase().includes(term) ||
        report.sitio.toLowerCase().includes(term) ||
        report.subLocation.toLowerCase().includes(term) ||
        report.reporterName.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "All Status" ||
        report.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesSitio =
        sitioFilter === "All Sitios" || report.sitio === sitioFilter;

      const matchesSubLocation =
        subLocationFilter === "All Sub-locations" ||
        report.subLocation === subLocationFilter;

      const reportDate = new Date(report.dateTime);
      const fromDate = dateFrom ? new Date(dateFrom) : null;
      const toDate = dateTo ? new Date(dateTo) : null;

      if (toDate) {
        toDate.setHours(23, 59, 59, 999);
      }

      const matchesDateFrom = !fromDate || reportDate >= fromDate;
      const matchesDateTo = !toDate || reportDate <= toDate;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSitio &&
        matchesSubLocation &&
        matchesDateFrom &&
        matchesDateTo
      );
    });
  }, [
    reports,
    searchTerm,
    statusFilter,
    sitioFilter,
    subLocationFilter,
    dateFrom,
    dateTo,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    statusFilter,
    sitioFilter,
    subLocationFilter,
    dateFrom,
    dateTo,
  ]);

  const totalPages = Math.ceil(filteredReports.length / REPORTS_PER_PAGE);

  const paginatedReports = useMemo(() => {
    const startIndex = (currentPage - 1) * REPORTS_PER_PAGE;
    return filteredReports.slice(startIndex, startIndex + REPORTS_PER_PAGE);
  }, [filteredReports, currentPage]);

  const startEntry =
    filteredReports.length === 0 ? 0 : (currentPage - 1) * REPORTS_PER_PAGE + 1;
  const endEntry = Math.min(
    currentPage * REPORTS_PER_PAGE,
    filteredReports.length,
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen p-6 ">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Reports Management</h1>
        <p className=" text-sm text-slate-600">
          View and manage all incident reports
        </p>
      </div>

      <ReportsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sitioFilter={sitioFilter}
        setSitioFilter={setSitioFilter}
        subLocationFilter={subLocationFilter}
        setSubLocationFilter={setSubLocationFilter}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        clearFilters={clearFilters}
      />

      <Card className="rounded-2xl" size="default">
        <CardHeader>
          <CardTitle className="text-xl">
            All Reports ({filteredReports.length})
          </CardTitle>
          <CardDescription>
            Review submitted incidents and open full details
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-0">
              <thead>
                <tr className="text-left text-sm font-semibold text-slate-900">
                  <th className="border-b border-gray-200 px-4 py-4">
                    Report ID
                  </th>
                  <th className="border-b border-gray-200 px-4 py-4">
                    Date & Time
                  </th>
                  <th className="border-b border-gray-200 px-4 py-4">
                    Location
                  </th>
                  <th className="border-b border-gray-200 px-4 py-4">
                    Incident Type
                  </th>
                  <th className="border-b border-gray-200 px-4 py-4">
                    Urgency
                  </th>
                  <th className="border-b border-gray-200 px-4 py-4">Status</th>
                  <th className="border-b border-gray-200 px-4 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedReports.length > 0 ? (
                  paginatedReports.map((report) => (
                    <tr key={report.id} className="text-sm text-slate-800">
                      <td className="border-b border-gray-200 px-4 py-2 font-semibold">
                        {report.id}
                      </td>

                      <td className="border-b border-gray-200 px-4 py-2">
                        {report.dateTime}
                      </td>

                      <td className="border-b border-gray-200 px-4 py-2">
                        <div className="font-semibold">{report.sitio}</div>
                        <div className="text-slate-500">
                          {report.subLocation}
                        </div>
                      </td>

                      <td className="border-b border-gray-200 px-4 py-2">
                        {report.incidentType}
                      </td>

                      <td className="border-b border-gray-200 px-4 py-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${
                              urgencyDotColors[report.urgency] || "bg-gray-400"
                            }`}
                          />
                          <span>{report.urgency}</span>
                        </div>
                      </td>

                      <td className="border-b border-gray-200 px-4 py-2">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            statusBadgeStyles[report.status] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {report.status}
                        </span>
                      </td>

                      <td className="border-b border-gray-200 px-4 py-2">
                        <Button
                          variant="outline"
                          onClick={() => handleView(report)}
                          className="inline-flex items-center gap-2 rounded-xl px-2 py-2"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-10 text-center text-sm text-slate-500"
                    >
                      No reports found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredReports.length > 0 && (
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">
                Showing {startEntry} to {endEntry} of {filteredReports.length}{" "}
                reports
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded-xl px-3 py-2"
                >
                  Previous
                </Button>

                <span className="text-sm text-slate-600">
                  Page {currentPage} of {totalPages}
                </span>

                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-xl px-3 py-2"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <ReportDetailsModal
        key={selectedReport?.id}
        report={
          selectedReport
            ? {
                ...selectedReport,
                dateTime: selectedReport.fullDateTime,
              }
            : null
        }
        isOpen={!!selectedReport}
        onClose={handleCloseModal}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default ReportsManagement;
