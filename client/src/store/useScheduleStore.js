import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-toastify";

export const useScheduleStore = create((set, get) => ({
  day: "Monday",
  tanods: [],
  isFetching: false,
  isSaving: false,
  counts: {},

  fetchTanodSchedule: async (day) => {
    set({ isFetching: true });

    try {
      const res = await axios.get(`/schedule?day=${day}`);

      set({
        tanods: res.data || [],
        day,
        isFetching: false,
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to load schedule");
      set({ isFetching: false });
    }
  },
  fetchOverview: async (day) => {
    set({ isFetching: true });

    try {
      const res = await axios.get(`/schedule/overview?day=${day}`);

      set({
        tanods: res.data.tanods,
        counts: res.data.counts,
        day,
        isFetching: false,
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to load schedule");
      set({ isFetching: false });
    }
  },

  toggleTanod: (id) => {
    set((state) => ({
      tanods: state.tanods.map((t) =>
        t.id === id ? { ...t, assigned: !t.assigned } : t,
      ),
    }));
  },

  selectAll: () => {
    set((state) => ({
      tanods: state.tanods.map((t) => ({ ...t, assigned: true })),
    }));
  },

  clearAll: () => {
    set((state) => ({
      tanods: state.tanods.map((t) => ({ ...t, assigned: false })),
    }));
  },

  saveSchedule: async () => {
    const { day, tanods } = get();

    const assignedIds = tanods.filter((t) => t.assigned).map((t) => t.id);

    set({ isSaving: true });

    try {
      await axios.post("/schedule/set-schedule", {
        day,
        tanodIds: assignedIds,
      });

      await get().fetchOverview(day);

      toast.success("Schedule saved successfully");
    } catch (err) {
      toast.error("Failed to save schedule");
    } finally {
      set({ isSaving: false });
    }
  },
}));
