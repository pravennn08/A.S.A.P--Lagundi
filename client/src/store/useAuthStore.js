import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-toastify";

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isError: null,
  isCheckingAuth: true,
  users: [],

  logIn: async (username, password) => {
    set({ isLoading: true });

    try {
      const res = await axios.post("/auth/login", { username, password });

      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      return res.data.user;
    } catch (error) {
      set({
        isError:
          error?.response?.data?.message ||
          `Error signing in - ${error.message}`,
        isLoading: false,
      });
      toast.error(error?.response?.data?.message);

      throw error;
    }
  },
  checkUserAuth: async () => {
    set({ isCheckingAuth: true, isError: null });

    try {
      const response = await axios.get("/auth/check-auth");

      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },
  updateUser: async (id, formData) => {
    set({ isLoading: true, isError: null });

    try {
      const res = await axios.put(`/auth/${id}`, formData);

      set({
        user: res.data.user,
        isLoading: false,
      });

      toast.success("Profile updated successfully");

      return res.data.user;
    } catch (error) {
      set({
        isError: error?.response?.data?.message || "Failed to update profile",
        isLoading: false,
      });

      toast.error(error?.response?.data?.message);
      throw error;
    }
  },
  resetPassword: async (newPassword, confirmPassword) => {
    set({ isLoading: true, isError: null });

    try {
      const res = await axios.patch("/auth/reset-password", {
        newPassword,
        confirmPassword,
      });

      set({ isLoading: false });

      toast.success(res.data.message || "Password updated");
    } catch (error) {
      set({
        isError: error?.response?.data?.message || "Failed to reset password",
        isLoading: false,
      });

      toast.error(error?.response?.data?.message);
      throw error;
    }
  },
  logOut: async () => {
    set({ isLoading: true, isError: null });

    try {
      await axios.post("/auth/logout");

      // Clear user state
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });

      toast.success("Logged out successfully");
    } catch (error) {
      set({
        isError: error?.response?.data?.message || "Logout failed",
        isLoading: false,
      });

      toast.error(error?.response?.data?.message);
    }
  },
}));
