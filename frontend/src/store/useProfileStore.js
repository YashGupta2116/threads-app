import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {axiosInstance} from '@/lib/axios';
import {Navigate} from 'react-router-dom';

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
          const response = await axiosInstance.get(`/auth/profile/${username}`);
          if (response.data && (response.data.username || response.data.user)) {
            const userData = response.data.user || response.data;
            set({userProfile: userData});
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
        } catch (error) {
          console.error('Error while updating user profile:', error);
        } finally {
          set({isEditingUserProfile: false});
        }
      },

      // Add a clear method to reset profile data
      clearUserProfile: () => set({userProfile: null}),

      isFollowed: null,
      checkFollowStatus: async (followId) => {
        try {
          const response = await axiosInstance.get(
            `/auth/check-follow/${followId}`
          );
          set({isFollowed: response.data.isFollowed});
        } catch (error) {
          console.error('Error checking follow status:', error.message);
        }
      },

      isFollowingUser: false,

      followUser: async (followId) => {
        set({isFollowingUser: true});
        try {
          const response = await axiosInstance.patch(
            `/auth/follow/${followId}`
          );
          const followed = response.data.followed;

          set((state) => {
            if (!state.userProfile || !state.authUserProfile) return {};

            const updatedFollowers = followed
              ? [...state.userProfile.followers, state.authUserProfile._id] // Add follower
              : state.userProfile.followers.filter(
                  (id) => id !== state.authUserProfile._id
                ); // Remove follower

            const updatedFollowings = followed
              ? [...state.authUserProfile.followings, followId] // Add following
              : state.authUserProfile.followings.filter(
                  (id) => id !== followId
                ); // Remove following

            return {
              isFollowed: followed,
              userProfile: {...state.userProfile, followers: updatedFollowers},
              authUserProfile: {
                ...state.authUserProfile,
                followings: updatedFollowings,
              },
            };
          });
        } catch (error) {
          console.log('Error in following user:', error.message);
        } finally {
          set({isFollowingUser: false});
        }
      },
    }),

    {
      name: 'auth-user-profile',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
