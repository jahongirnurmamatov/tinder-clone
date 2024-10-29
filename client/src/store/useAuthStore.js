import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { set } from "mongoose";


export const useAuthStore = create((set) => ({
  authUser: null,
  checkingAuth: true,
  loading: false,

  signup: async (signupData) => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.post("/auth/signup", signupData);
      console.log(data);
      if (data.user) {
        set({ authUser: data.user });
        toast.success("Account created successfully");
      } else {
        toast.error("User data not returned correctly.");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  login: async (loginData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post('/auth/login',loginData);
      if(res.data.user){
        set({authUser:res.data.user});
        toast.success("Logged in successfully");
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message || "Something went wrong")
    }finally{
      set({loading:false});
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      set({ authUser: res.data.user });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ checkingAuth: false });
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      if (res.status === 200) {
        set({ authUser: null });
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
