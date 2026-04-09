import { MapPin, TrendingUp, Calendar } from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";
import OverviewCard from "../../components/dashboard/OverviewCard";
import IncidentFeed from "../../components/dashboard/IncidentFeed";
import RealTimeReportModal from "../../components/reports/RealTimeReportModal";
import { useEffect } from "react";
import { useReportStore } from "../../store/useReportStore";
import Spinner from "../../utils/Spinner";
import {
  ClipboardList,
  CircleCheckBig,
  Clock3,
  AlertCircle,
} from "lucide-react";

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

  const statCards = [
    {
      label: "Total Reports",
      value: stats.totalReports,
      caption: "All time incidents",
      icon: ClipboardList,
      iconWrap: "bg-blue-100 text-blue-600",
    },
    {
      label: "Responded",
      value: stats.responded,
      caption: "In progress or resolved",
      icon: CircleCheckBig,
      iconWrap: "bg-green-100 text-green-600",
    },
    {
      label: "Pending",
      value: stats.pending,
      caption: "Awaiting response",
      icon: Clock3,
      iconWrap: "bg-amber-100 text-amber-600",
    },
    {
      label: "Resolved",
      value: stats.resolved,
      caption: "Completed cases",
      icon: AlertCircle,
      iconWrap: "bg-violet-100 text-violet-600",
    },
  ];

  if (isLoading) return <Spinner />;
  return (
    <div className=" min-h-screen p-6 space-y-6">
      {latestReport && (
        <RealTimeReportModal
          report={latestReport}
          onClose={closeModal}
          onRespond={handleRespond}
        />
      )}

      <div>
        <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
        <p className="text-sm text-gray-600">
          Real-time incident monitoring and statistics
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((item) => (
          <StatCard key={item.label} item={item} />
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
