import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,
  checkingAuth: true,
  loading: false,

  signup: async (signupData) => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.post("/auth/signup", signupData);
      set({ authUser: data.user });
      toast.success("Signup successful");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  },
}));
