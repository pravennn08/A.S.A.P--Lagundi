import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Files, Bell, Settings } from "lucide-react";
import Sidebar from "../dashboard/SideBar";
import Topbar from "../dashboard/Topbar";
import { useReportStore } from "../../store/useReportStore";
import EmergencyAlertModal from "../reports/EmergencyAlertModal";

const PersonnelLayout = () => {
  const navigate = useNavigate();
  const { notifications, fetchNotifications } = useReportStore();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // LOCAL STATE ONLY
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(true);

  // dummy emergency data
  const [latestEmergency, setLatestEmergency] = useState({
    id: "69da673d4eac6d1d2fda48cb",
    title: "Vehicular Accident",
    message: "Suspicious activity reported near entrance.",
    priority: "orange",
    location: "Main Gate",
    reportedBy: "Security Guard",
    status: "Pending",
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const personnelMenuItems = [
    { name: "Dashboard", path: "/personnel/dashboard", icon: LayoutDashboard },
    { name: "Reports", path: "/personnel/reports", icon: Files },
    {
      name: "Notifications",
      path: "/personnel/notifications",
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : null,
    },
    { name: "Settings", path: "/personnel/settings", icon: Settings },
  ];

  const getTitle = () => {
    if (location.pathname.includes("/personnel/reports")) return "Reports";
    if (location.pathname.includes("/personnel/notifications"))
      return "Notifications";
    if (location.pathname.includes("/personnel/settings")) return "Settings";
    return "Dashboard";
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        menuItems={personnelMenuItems}
      />

      <div className="lg:ml-[250px]">
        <Topbar title={getTitle()} onMenuClick={() => setSidebarOpen(true)} />

        <EmergencyAlertModal
          isOpen={showEmergencyAlert}
          emergency={latestEmergency}
          onClose={() => setShowEmergencyAlert(false)}
          onView={() => {
            setShowEmergencyAlert(false);
            navigate("/personnel/reports", {
              state: {
                openReportId: latestEmergency.id,
              },
            });
          }}
        />

        <div className="px-4 pt-4">
          <button
            onClick={() => {
              setLatestEmergency({
                id: "RPT-003",
                ref: "INC-2026-003",
                title: "Fire Incident",
                message: "Fire reported inside kitchen area.",
                priority: "red",
                location: "Building B",
                reportedBy: "Staff",
                status: "Urgent",
                createdAt: new Date().toISOString(),
              });
              setShowEmergencyAlert(true);
            }}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Trigger Emergency Alert
          </button>
        </div>

        <main className="bg-white mt-10 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PersonnelLayout;
