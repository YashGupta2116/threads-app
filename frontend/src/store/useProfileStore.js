import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {axiosInstance} from '@/lib/axios';

export const useProfileStore = create(
  persist(
    (set) => ({
      authUserProfile: null,
      userProfile: null,
      isGettingUserProfile: false,
      isEditingUserProfile: false, // Fixed variable name

      getAuthUserProfile: async () => {
        set({isGettingUserProfile: true});
        try {
          const response = await axiosInstance.get('/auth/get-user');
          set({authUserProfile: response.data.user});
          return response.data.user;
        } catch (error) {
          console.error('Error while getting auth user profile:', error);
          return null;
        } finally {
          set({isGettingUserProfile: false});
        }
      },

      getUserProfile: async (username) => {
        set({isGettingUserProfile: true});
        try {
          console.log('Fetching profile for:', username);
          const response = await axiosInstance.get(`/auth/profile/${username}`);
          console.log('Profile API response:', response.data);
          // Check if the response has the expected data structure
          if (response.data && (response.data.username || response.data.user)) {
            // Some APIs return {user: {...}} while others return the user object directly
            const userData = response.data.user || response.data;
            set({userProfile: userData});
            return userData;
          } else {
            console.error(
              'Invalid response format from profile API:',
              response.data
            );
            set({userProfile: null});
            return null;
          }
        } catch (error) {
          console.error('Error while getting user profile:', error);
          set({userProfile: null});
          return null;
        } finally {
          set({isGettingUserProfile: false});
        }
      },

      editProfile: async (data) => {
        set({isEditingUserProfile: true});
        try {
          const response = await axiosInstance.patch(
            '/auth/update-profile',
            data
          );
          set({authUserProfile: response.data.updatedUser});
          return response.data.updatedUser;
        } catch (error) {
          console.error('Error while updating user profile:', error);
          return null;
        } finally {
          set({isEditingUserProfile: false});
        }
      },

      // Add a clear method to reset profile data
      clearUserProfile: () => set({userProfile: null}),
    }),
    {
      name: 'auth-user-profile',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
