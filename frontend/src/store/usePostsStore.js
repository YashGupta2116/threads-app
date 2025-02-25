import {create} from 'zustand';
import {axiosInstance} from '@/lib/axios';

export const usePostsStore = create((set) => ({
  userPosts: null,
  gettingUserPosts: false,

  getUserPosts: async () => {
    set({gettingUserPosts: true});
    try {
      const response = await axiosInstance.get('/posts/');

      set({userPosts: response.data.allUserPosts});
    } catch (error) {
      console.log('Error while getting user posts');
    } finally {
      set({gettingUserPosts: false});
    }
  },

  isCreatingPost: false,
  createdPost: null,
  createPost: async (data) => {
    set({isCreatingPost: true});
    try {
      const response = await axiosInstance.post('/posts/', data);

      set({createdPost: response.post});
    } catch (error) {
      console.log('error in creating the post ', error);
    } finally {
      set({isCreatingPost: false});
    }
  },
}));
