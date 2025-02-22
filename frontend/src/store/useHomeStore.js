import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "@/lib/axios";

export const useHomeStore = create(
  persist(
    (set) => ({
      userProfile: null,
      isGettingUserProfile: false,

      getUserProfile: async () => {
        set({ isGettingUserProfile: true });
        try {
          const response = await axiosInstance.get("/auth/get-user");
          set({ userProfile: response.data });
        } catch (error) {
          console.log("Error while getting user profile");
        } finally {
          set({ isGettingUserProfile: false });
        }
      },
    }),
    {
      name: "user-profile", // Key for localStorage
      getStorage: () => localStorage, // Use localStorage to persist data
    }
  )
);