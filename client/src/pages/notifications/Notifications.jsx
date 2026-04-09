import { useEffect, useState } from "react";
import { useReportStore } from "../../store/useReportStore";
import Spinner from "../../utils/Spinner";
import {
  Bell,
  AlertCircle,
  TrendingUp,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

const StatCard = ({ title, value, icon, iconWrap }) => {
  const Icon = icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full ${iconWrap}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-3xl font-bold tracking-tight text-gray-700">
            {value}
          </h3>
          <p className="text-sm text-slate-600">{title}</p>
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  const {
    notificationStats,
    fetchNotificationStats,
    fetchNotifications,
    notifications,
    markAsRead,
    updateRespondReport,
    isLoading,
  } = useReportStore();
  const statCards = [
    {
      title: "Total",
      value: notificationStats.total,
      icon: Bell,
      iconWrap: "bg-blue-100 text-blue-600",
    },
    {
      title: "Emergency",
      value: notificationStats.emergency,
      icon: AlertCircle,
      iconWrap: "bg-red-100 text-red-500",
    },
    {
      title: "Updates",
      value: notificationStats.updates,
      icon: TrendingUp,
      iconWrap: "bg-green-100 text-green-600",
    },
    {
      title: "Schedule",
      value: notificationStats.schedule,
      icon: CalendarDays,
      iconWrap: "bg-purple-100 text-purple-600",
    },
  ];

  useEffect(() => {
    fetchNotificationStats();
    fetchNotifications();
  }, []);
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const readNotifications = notifications.filter((n) => n.isRead);
  const [respondingId, setRespondingId] = useState(null);
  if (isLoading) return <Spinner />;
  return (
    <div className="min-h-screen p-5 md:p-6">
      <div className="mx-auto max-w-8xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-700">
              Notifications
            </h1>
            <p className="text-sm  text-slate-600">
              All system alerts and updates
            </p>
          </div>

          <div className="inline-flex w-fit items-center text-gray-700">
            <span className="text-lg  leading-none">{unreadCount}</span>
            <span className="ml-2 text-lg">Unread</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((item) => (
            <StatCard
              key={item.title}
              title={item.title}
              value={item.value}
              icon={item.icon}
              iconWrap={item.iconWrap}
            />
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-gray-700" />
              <h2 className="text-xl font-semibold text-gray-700">
                Read Notifications ({readNotifications.length})
              </h2>
            </div>
          </div>

          <div className="flex min-h-[320px] items-center justify-center px-6 py-10">
            <div className="w-full space-y-3">
              {notifications.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-12">
                  No notifications
                </p>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`group flex items-start justify-between gap-4 rounded-xl border p-4 transition-all duration-200 ${
                      notification.isRead
                        ? "bg-white border-slate-200 hover:border-slate-300"
                        : "bg-white border-l-4 border-l-blue-500 border-slate-200"
                    }`}
                  >
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <p
                        className={`text-sm font-medium ${
                          notification.isRead
                            ? "text-slate-700"
                            : "text-slate-900"
                        }`}
                      >
                        {notification.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {notification.message}
                      </p>
                      {notification.responded && (
                        <p className="text-xs text-green-600 mt-1">
                          Responded by {notification.respondedBy || "User"}
                        </p>
                      )}
                    </div>

                    {/* <button
                      type="button"
                      disabled={respondingId === notification.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setRespondingId(notification.id);
                        // handle respond action
                        // When done, call setRespondingId(null)
                      }}
                      className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                        respondingId === notification.id
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      {respondingId === notification.id ? "Respond" : "Respond"}
                    </button> */}
                    <button
                      type="button"
                      disabled={
                        notification.responded ||
                        respondingId === notification.id
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        setRespondingId(notification.id);

                        updateRespondReport(notification.id).finally(() =>
                          setRespondingId(null),
                        );
                      }}
                      className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
                        notification.responded
                          ? "bg-green-100 text-green-600 cursor-not-allowed"
                          : "text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      {notification.responded ? "Responded" : "Respond"}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
