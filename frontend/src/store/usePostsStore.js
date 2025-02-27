import {create} from 'zustand';
import {axiosInstance} from '@/lib/axios';

export const usePostsStore = create((set) => ({
  userPosts: null,
  gettingUserPosts: false,

  getUserPosts: async (username = '') => {
    set({gettingUserPosts: true});
    try {
      const endpoint = username
        ? `/posts/get-posts/${username}`
        : '/posts/get-posts';
      const response = await axiosInstance.get(endpoint);
      set({userPosts: response.data.posts}); // Use `posts` instead of `allUserPosts`
    } catch (error) {
      console.error('Error while getting user posts:', error.message);
    } finally {
      set({gettingUserPosts: false});
    }
  },

  isCreatingPost: false,
  createPost: async (data) => {
    set({isCreatingPost: true});
    try {
      const response = await axiosInstance.post('/posts/', data);
      set((state) => ({
        userPosts: [response.data.post, ...state.userPosts], // Add new post
      }));
    } catch (error) {
      console.error('Error in creating post:', error.message);
    } finally {
      set({isCreatingPost: false});
    }
  },

  isDeletingPost: false,
  deletePost: async (postId) => {
    set({isDeletingPost: true});
    try {
      const response = await axiosInstance.delete(
        `/posts/deletePost?postId=${postId}`
      );

      set((state) => ({
        userPosts: state.userPosts.filter((post) => post._id !== postId),
      }));
    } catch (error) {
      console.error('Error in deleting post:', error.message);
    } finally {
      set({isDeletingPost: false});
    }
  },
}));
