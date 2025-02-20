import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const authStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,

  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post("/auth/signup", data);

      set({ authUser: res.data });

      console.log("Account Created successfully");
    } catch (error) {
      console.log("errrrrror: ", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);

      set({ authUser: res.data });
      console.log("Logged in successfully");
    } catch (error) {
      console.log("Error in authStore login ");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async (res) => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });

      console.log("Logged out successfully");
    } catch (error) {
      console.log("Error in logout: ", error);
    }
  },
}));
