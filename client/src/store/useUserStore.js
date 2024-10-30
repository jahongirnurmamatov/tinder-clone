import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useUserStore = create((set) => ({
  loading: false,

  updateProfile: async (updateData) => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.put("/users/update", updateData);
      if (data.success) {
        toast.success("Profile updated successfull!");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
