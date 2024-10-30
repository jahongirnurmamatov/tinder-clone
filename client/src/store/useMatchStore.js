import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useMatchStore = create((set) => ({
  matches: [],
  isLoadingMatches: false,
  isLoadingProfiles: false,
  userProfiles: [],

  getMatches: async () => {
    try {
      set({ isLoadingMatches: true });
      const { data } = await axiosInstance("/matches/");
      if (data.success) {
        set({ matches: data.matches });
      }
    } catch (error) {
      set({ matches: [] });
      toast.error(error.data.message);
    } finally {
      set({ isLoadingMatches: false });
    }
  },
  getUserProfiles: async () => {
    try {
      set({ isLoadingProfiles: true });
      const { data } = await axiosInstance("/matches/user-profiles");
      if (data.success) {
        set({ userProfiles: data.users });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      set({ userProfiles: [] });
      toast.error(error.data.message);
    } finally {
      set({ isLoadingProfiles: false });
    }
  },
}));
