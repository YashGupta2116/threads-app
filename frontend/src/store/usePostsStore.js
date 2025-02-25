import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { persist } from "zustand/middleware";


export const usePostsStore = create(persist((set) => ({
    userPosts: null,
    gettingUserPosts: false,

    getUserPosts: async () => {
        set({gettingUserPosts : true});
        try {
            const response = await axiosInstance.get("/posts/");

            set({userPosts: response.data});
        } catch (error) {
            console.log("Error while getting user posts");
        } finally {
            set({gettingUserPosts: false});
        }
    }

}) , {
    name: "user-posts", // Key for localStorage
    getStorage: () => localStorage, // Use localStorage to persist data
}));