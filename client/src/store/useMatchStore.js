import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { getSocket } from "../socket/socket.client";

export const useMatchStore = create((set) => ({
  matches: [],
  isLoadingMatches: false,
  isLoadingProfiles: false,
  userProfiles: [],
  swipeFeedback: null,

  getMatches: async () => {
    try {
      set({ isLoadingMatches: true });
      const { data } = await axiosInstance("/matches/all-matches");
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
  swipeLeft: async (user) => {
    try {
      await axiosInstance.post("/matches/swipe-left/" + user._id);
      set({ swipeFeedback: "passed" });
    } catch (error) {
      console.log(error);
      toast.error("Failed to select left");
    } finally {
      setTimeout(() => set({ swipeFeedback: null }), 1500);
    }
  },
  swipeRight: async (user) => {
    try {
      await axiosInstance.post("/matches/swipe-right/" + user._id);
      set({ swipeFeedback: "liked" });
    } catch (error) {
      console.log(error);
      toast.error("Failed to select right");
    } finally {
      setTimeout(() => set({ swipeFeedback: null }), 1500);
    }
  },
  subscribeToNewMatches: () => {
    try {
      const socket = getSocket();
      socket.on("newMatch", (newMatch) => {
        set((state) => ({ matches: [...state.matches, newMatch] }));
        toast.success("You got a new match!");
      });
    } catch (error) {
      console.log(error);
    }
  },
  unsubscribeToNewMatches: () => {
    try {
      const socket = getSocket();
      socket.off("newMatch");
    } catch (error) {
      console.log(error);
    }
  },
}));
