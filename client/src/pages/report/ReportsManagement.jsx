import { useMemo, useState, useEffect } from "react";
import { Search, Filter, ChevronDown, Eye } from "lucide-react";
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

const statusOptions = ["All Statuses", "Pending", "In Progress", "Resolved"];
const sitioOptions = [
  "All Sitios",
  "Bulaklak",
  "Centro",
  "Queensborough",
  "Paroba",
  "Paz Ville",
  "Sto. Niño",
  "Tramo",
  "Troso",
];

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

const ReportsManagement = () => {
  const {
    reports,
    fetchReports,
    updateReportStatus,
    isLoading,
    fetchSingleReport,
    singleReport,
  } = useReportStore();

  const [selectedReport, setSelectedReport] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [sitioFilter, setSitioFilter] = useState("All Sitios");
  useEffect(() => {
    fetchReports();
  }, []);

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
        statusFilter === "All Statuses" ||
        report.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesSitio =
        sitioFilter === "All Sitios" || report.sitio === sitioFilter;

      return matchesSearch && matchesStatus && matchesSitio;
    });
  }, [reports, searchTerm, statusFilter, sitioFilter]);
  if (isLoading) return <Spinner />;
  return (
    <div className="min-h-screen p-6 ">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Reports Management</h1>
        <p className=" text-sm text-slate-600">
          View and manage all incident reports
        </p>
      </div>

      <Card className="mb-6 rounded-2xl" size="default">
        <CardHeader>
          <CardTitle className="text-2xl">Filters</CardTitle>
          <CardDescription>
            Search and narrow down reports by status and sitio
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div>
              <label className="mb-2 flex items-center gap-2 text-base font-semibold text-gray-700">
                <Search size={18} />
                Search
              </label>
              <input
                type="text"
                placeholder="Search by ID, reporter, type, sitio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-base font-semibold text-gray-700">
                <Filter size={18} />
                Status
              </label>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 pr-10 text-sm font-medium outline-none transition focus:border-blue-500 focus:bg-white"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-base font-semibold text-gray-700">
                Sitio
              </label>
              <div className="relative">
                <select
                  value={sitioFilter}
                  onChange={(e) => setSitioFilter(e.target.value)}
                  className="h-10 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 pr-10 text-sm font-medium outline-none transition focus:border-blue-500 focus:bg-white"
                >
                  {sitioOptions.map((sitio) => (
                    <option key={sitio} value={sitio}>
                      {sitio}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
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
