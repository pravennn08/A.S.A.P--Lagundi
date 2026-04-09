import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
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

const AdminLayout = () => {
  const { notifications, fetchNotifications } = useReportStore();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    fetchNotifications();
  }, []);

  const adminMenuItems = [
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
  ];
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

        <main className="bg-white mt-10 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
