import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Files, Bell, Settings } from "lucide-react";
import Sidebar from "../dashboard/SideBar";
import Topbar from "../dashboard/Topbar";
import { useReportStore } from "../../store/useReportStore";

const PersonnelLayout = () => {
  const { notifications, fetchNotifications } = useReportStore();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    fetchNotifications();
  }, []);

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
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

        <main className="bg-white mt-10 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PersonnelLayout;
