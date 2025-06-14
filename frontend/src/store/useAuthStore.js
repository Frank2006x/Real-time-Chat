import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { LogIn } from "lucide-react";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isUpdatingProfile: false,
  isLoggingIn: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (err) {
      console.log("check Auth errr", err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      console.log(data);
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success("Account created successfully");
      set({ authUser: res.data });
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  },
  login: async (data) => {
    set({ isLogingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isLogingIn: false });
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      toast.success("Profile updated successfully");
      set({ authUser: res.data });
    } catch (error) {
      console.log("error in updating profile", error);
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
