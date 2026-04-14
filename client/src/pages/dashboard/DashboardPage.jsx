import { MapPin, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import StatCard from "../../components/dashboard/StatCard";
import OverviewCard from "../../components/dashboard/OverviewCard";
import IncidentFeed from "../../components/dashboard/IncidentFeed";
import DashboardFilters from "../../components/filters/DashboardFilters";
import RealTimeReportModal from "../../components/reports/RealTimeReportModal";
import { useReportStore } from "../../store/useReportStore";
import Spinner from "../../utils/Spinner";
import {
  ClipboardList,
  CircleCheckBig,
  Clock3,
  AlertCircle,
} from "lucide-react";
import SitioReportsModal from "../../components/dashboard/SitioReportsModal";
import RespondedReportsModal from "../../components/dashboard/RespondedReportsModal";
import PendingReportsModal from "../../components/dashboard/PendingReportsModal";
import ResolvedReportsModal from "../../components/dashboard/ResolvedReportsModal";

const DashboardPage = () => {
  const {
    stats,
    fetchReportStats,
    fetchReportFeed,
    feed,
    isLoading,
    connectSocket,
    latestReport,
    updateRespondReport,
  } = useReportStore();

  const [selectedSitio, setSelectedSitio] = useState("");
  const [selectedSubLocation, setSelectedSubLocation] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [openSitioModal, setOpenSitioModal] = useState(false);
  const [openRespondedModal, setOpenRespondedModal] = useState(false);
  const [openPendingModal, setOpenPendingModal] = useState(false);
  const [openResolvedModal, setOpenResolvedModal] = useState(false);

  useEffect(() => {
    fetchReportStats();
    fetchReportFeed();
    connectSocket();
    console.log("Current reports:", feed);

    return () => {
      useReportStore.getState().disconnectSocket();
    };
  }, []);

  const closeModal = () => {
    useReportStore.setState({ latestReport: null });
  };

  {
    latestReport && latestReport.urgencyLevel === "emergency" && (
      <RealTimeReportModal report={latestReport} onClose={closeModal} />
    );
  }

  const handleRespond = async (report) => {
    try {
      await updateRespondReport(report.id);

      // optional: close modal after respond
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const clearFilters = () => {
    setSelectedSitio("");
    setSelectedSubLocation("");
    setDateFrom("");
    setDateTo("");
  };

  const statCards = [
    {
      label: "Total Reports",
      value: stats.totalReports,
      caption: "All time incidents",
      data: feed,
      icon: ClipboardList,
      iconWrap: "bg-blue-100 text-blue-600",
      onClick: () => setOpenSitioModal(true),
    },
    {
      label: "Responded",
      value: stats.responded,
      caption: "In progress or resolved",
      icon: CircleCheckBig,
      iconWrap: "bg-green-100 text-green-600",
      onClick: () => setOpenRespondedModal(true),
    },
    {
      label: "Pending",
      value: stats.pending,
      caption: "Awaiting response",
      icon: Clock3,
      iconWrap: "bg-amber-100 text-amber-600",
      onClick: () => setOpenPendingModal(true),
    },
    {
      label: "Resolved",
      value: stats.resolved,
      caption: "Completed cases",
      icon: AlertCircle,
      iconWrap: "bg-violet-100 text-violet-600",
      onClick: () => setOpenResolvedModal(true),
    },
  ];

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen p-6 space-y-6">
      {latestReport && (
        <RealTimeReportModal
          report={latestReport}
          onClose={closeModal}
          onRespond={handleRespond}
        />
      )}

      <SitioReportsModal
        open={openSitioModal}
        onClose={() => setOpenSitioModal(false)}
        sitioReports={null} // add prop to pass filtered reports based on selected sitio
      />

      <RespondedReportsModal
        open={openRespondedModal}
        onClose={() => setOpenRespondedModal(false)}
        respondedReports={null} // add prop to pass filtered reports based on selected sitio
      />

      <PendingReportsModal
        open={openPendingModal}
        onClose={() => setOpenPendingModal(false)}
        pendingReports={null} // add prop to pass filtered reports based on selected sitio
      />

      <ResolvedReportsModal
        open={openResolvedModal}
        onClose={() => setOpenResolvedModal(false)}
        resolvedReports={null} // add prop to pass filtered reports based on selected sitio
      />

      <DashboardFilters
        selectedSitio={selectedSitio}
        setSelectedSitio={setSelectedSitio}
        selectedSubLocation={selectedSubLocation}
        setSelectedSubLocation={setSelectedSubLocation}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        clearFilters={clearFilters}
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((item) => (
          <StatCard key={item.label} item={item} onClick={item.onClick} />
        ))}
      </div>

      {/* Overview */}
      <div className="grid lg:grid-cols-2 gap-4">
        <OverviewCard
          icon={MapPin}
          title="Top Reporting Area"
          value={stats.topArea?._id || "N/A"}
          subtitle={`${stats.topArea?.count || 0} incidents reported`}
        />

        <OverviewCard
          icon={TrendingUp}
          title="Most Common Incident"
          value={stats.topIncident?._id || "N/A"}
          subtitle={`${stats.topIncident?.count || 0} cases reported`}
        />
      </div>

      {/* Feed */}
      <IncidentFeed incidents={feed} />
    </div>
  );
};

export default DashboardPage;
