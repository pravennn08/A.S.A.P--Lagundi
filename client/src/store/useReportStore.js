import { create } from "zustand";
import { io } from "socket.io-client";
import axios from "../lib/axios.js";
import { toast } from "react-toastify";
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "";
let socket;

export const useReportStore = create((set, get) => ({
  reports: [],
  stats: {
    totalReports: 0,
    pending: 0,
    responded: 0,
    resolved: 0,
    topArea: null,
    topIncident: null,
  },
  feed: [],
  notifications: [],
  notificationStats: {
    total: 0,
    emergency: 0,
    updates: 0,
    schedule: 0,
  },
  singleReport: null,
  isSingleLoading: false,
  isLoading: false,
  latestReport: null,

  connectSocket: () => {
    if (socket) return;

    socket = io(BASE_URL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log("SOCKET ERROR:", err.message);
    });

    socket.on("new-report", (report) => {
      console.log("RECEIVED REPORT:", report);

      set((state) => ({
        feed: [report, ...state.feed],
        latestReport: report,
        notifications: [
          {
            id: report.id,
            title: report.incidentType,
            message: `${report.sitio} - ${report.subLocation}`,
            isRead: false,
          },
          ...state.notifications,
        ],
      }));
      get().fetchReportFeed();
      get().fetchReportStats();
      get().fetchReports();
    });
  },

  disconnectSocket: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },

  createReport: async (formDataInput) => {
    set({ isLoading: true });

    try {
      const formData = new FormData();

      Object.entries(formDataInput).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      const response = await axios.post("/report/create", formData);

      set((state) => ({
        reports: [...state.reports, response.data],
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });

      const message = error?.response?.data?.message || "Something went wrong";

      toast.error(message);
      console.log(message);
    }
  },

  fetchReports: async () => {
    set({ isLoading: true });

    try {
      const res = await axios.get("/report");

      set({
        reports: res.data,
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
      set({ isLoading: false });
    }
  },

  fetchReportStats: async () => {
    set({ isLoading: true });

    try {
      const res = await axios.get("/report/stats");

      set({
        stats: res.data,
        isLoading: false,
      });
      console.log(res.data);
    } catch (err) {
      set({ isLoading: false });
    }
  },

  fetchReportFeed: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("/report/feed");
      set({ feed: res.data, isLoading: false });
    } catch (err) {
      console.log(err);
      set({ isLoading: false });
    }
  },

  fetchSingleReport: async (id) => {
    set({ isSingleLoading: true });

    try {
      const res = await axios.get(`/report/${id}`);

      set({
        singleReport: res.data,
        isSingleLoading: false,
      });
    } catch (err) {
      console.log(err);
      set({ isSingleLoading: false });
    }
  },

  updateReportStatus: async (id, status) => {
    try {
      await axios.patch(`/report/${id}`, { status });

      const normalized = status.toLowerCase().replace(" ", "_");

      set((state) => ({
        singleReport: state.singleReport
          ? { ...state.singleReport, status: normalized }
          : null,

        reports: state.reports.map((r) => (r.id === id ? { ...r, status } : r)),

        feed: state.feed.map((r) =>
          r.id === id ? { ...r, status: normalized } : r,
        ),
      }));

      get().fetchReportStats();

      toast.success("Status updated successfully");
    } catch (err) {
      toast.error("Failed to update status");
    }
  },
  fetchNotificationStats: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("/report/notifications/stats");

      set({
        notificationStats: res.data,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
    }
  },

  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("/report/notifications");

      set({
        notifications: res.data,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
    }
  },

  markAsRead: async (id) => {
    try {
      await axios.patch(`/report/notifications/${id}/read`);

      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  },
  updateRespondReport: async (id) => {
    try {
      const res = await axios.patch(`/report/${id}/respond`);

      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id
            ? {
                ...n,
                responded: true,
                respondedBy: res.data.respondedBy,
                respondedAt: res.data.respondedAt,
              }
            : n,
        ),

        feed: state.feed.map((r) =>
          r.id === id
            ? {
                ...r,
                status: "in_progress",
              }
            : r,
        ),
      }));

      return res.data;
    } catch (error) {
      throw error;
    }
  },
}));
