import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "@/lib/axios";

export const useProfileStore = create(
  persist(
    (set) => ({
      userProfile: null,
      isGettingUserProfile: false,

      getUserProfile: async () => {
        set({ isGettingUserProfile: true });
        try {
          const response = await axiosInstance.get("/auth/get-user");
          set({ userProfile: response.data.user });
        } catch (error) {
          console.log("Error while getting user profile");
        } finally {
          set({ isGettingUserProfile: false });
        }
      },

      isEditingProfile: false,

      editProfile: async(data) => {
        set({ isGettingUserProfile: true });
        try {
          const response = await axiosInstance.patch("/auth/update-profile" , data);
          set({ userProfile: response.data.updatedUser });
        } catch (error) {
          console.log("Error while getting user profile");
        } finally {
          set({ isGettingUserProfile: false });
        }
      }

    }),
    {
      name: "user-profile", // Key for localStorage
      getStorage: () => localStorage, // Use localStorage to persist data
    }
  )
);