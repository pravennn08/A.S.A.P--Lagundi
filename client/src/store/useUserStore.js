import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-toastify";

export const useUserStore = create((set, get) => ({
  users: [],
  isLoading: false,

  fetchUsers: async () => {
    try {
      set({ isLoading: true });

      const res = await axios.get("/users");

      set({ users: res.data, isLoading: false });

      return res.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
      set({ isLoading: false });
    }
  },

  setUsers: (users) => set({ users }),

  updateUserStatus: async (id, status) => {
    try {
      const normalized = status.toLowerCase();

      const res = await axios.patch(`/users/${id}`, {
        status: normalized,
      });

      const updatedUser = res.data;

      set((state) => ({
        // Update selected user
        selectedUser:
          state.selectedUser?._id === id ? updatedUser : state.selectedUser,

        // Update list
        users: state.users.map((u) => (u._id === id ? updatedUser : u)),
      }));

      await get().fetchUsers();

      toast.success("User status updated");
    } catch (err) {
      toast.error("Failed to update status");
    }
  },
  deleteUser: async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      }));

      toast.success("User deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    }
  },
  addUser: async (userData) => {
    try {
      set({ isLoading: true });

      const res = await axios.post("/users/create", userData);

      set((state) => ({
        users: [res.data, ...state.users],
        isLoading: false,
      }));
      await get().fetchUsers();

      toast.success("User created successfully");
      return res.data;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create user");
      set({ isLoading: false });
    }
  },
}));
