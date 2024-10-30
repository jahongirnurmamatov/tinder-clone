import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useMatchStore = create((set) => ({
  matches: [],

  loading: false,
  getMatches: async () => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance("/matches/");
      if (data.success) {
        set({ matches: data.matches });
      }
    } catch (error) {
      set({ matches: [] });
      toast.error(error.data.message);
    } finally {
      set({ loading: false });
    }
  },
}));
