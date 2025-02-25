import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {axiosInstance} from '@/lib/axios';

export const useProfileStore = create(
  persist(
    (set) => ({
      userProfile: null,
      isGettingUserProfile: false,

      getUserProfile: async () => {
        set({isGettingUserProfile: true});
        try {
          const response = await axiosInstance.get('/auth/get-user');
          set({userProfile: response.data.user});
        } catch (error) {
          console.log('Error while getting user profile');
        } finally {
          set({isGettingUserProfile: false});
        }
      },

      isEditingProfile: false,

      editProfile: async (data) => {
        set({isEditingUserProfile: true}); // Fixed variable name
        try {
          const response = await axiosInstance.patch(
            '/auth/update-profile',
            data
          );
          set({userProfile: response.data.updatedUser});
        } catch (error) {
          console.log('Error while updating user profile'); // Fixed error message
        } finally {
          set({isEditingUserProfile: false}); // Fixed variable name
        }
      },
    }),
    {
      name: 'user-profile',
      storage: createJSONStorage(() => sessionStorage), // Use createJSONStorage explicitly
    }
  )
);
