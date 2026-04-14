import { useState, useEffect, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Files,
  CalendarDays,
  User,
  Bell,
  Settings,
} from "lucide-react";
import Sidebar from "../dashboard/SideBar";
import Topbar from "../dashboard/Topbar";
import { useReportStore } from "../../store/useReportStore";
import EmergencyAlertModal from "../reports/EmergencyAlertModal";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { notifications, fetchNotifications } = useReportStore();

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications],
  );

  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // LOCAL STATE ONLY
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(true);

  // dummy data for modal
  const [latestEmergency] = useState({
    id: "69da699d4eac6d1d2fda48cc",
    title: "Vehicular Accident",
    message: "sjsjsjs",
    priority: "red",
    location: "Building A - 2nd Floor",
    reportedBy: "Juan Dela Cruz",
    status: "Pending",
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const adminMenuItems = useMemo(
    () => [
      { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
      { name: "Reports Management", path: "/admin/reports", icon: Files },
      { name: "Scheduling", path: "/admin/scheduling", icon: CalendarDays },
      { name: "User Management", path: "/admin/users", icon: User },
      {
        name: "Notifications",
        path: "/admin/notifications",
        icon: Bell,
        badge: unreadCount > 0 ? unreadCount : null,
      },
      { name: "Settings", path: "/admin/settings", icon: Settings },
    ],
    [unreadCount],
  );

  const getTitle = () => {
    if (location.pathname.includes("users")) return "User Management";
    if (location.pathname.includes("reports")) return "Reports Management";
    if (location.pathname.includes("scheduling")) return "Scheduling";
    if (location.pathname.includes("notifications")) return "Notifications";
    if (location.pathname.includes("settings")) return "Settings";
    return "Dashboard";
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        menuItems={adminMenuItems}
      />

      <div className="lg:ml-[250px]">
        <Topbar title={getTitle()} onMenuClick={() => setSidebarOpen(true)} />

        <EmergencyAlertModal
          isOpen={showEmergencyAlert}
          emergency={latestEmergency}
          onClose={() => setShowEmergencyAlert(false)}
          onView={() => {
            setShowEmergencyAlert(false);
            navigate("/admin/reports", {
              state: {
                openReportId: latestEmergency.id,
              },
            });
          }}
        />

        <div className="px-4 pt-4">
          <button
            onClick={() => setShowEmergencyAlert(true)}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Trigger Emergency Modal
          </button>
        </div>

        <main className="bg-white p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
