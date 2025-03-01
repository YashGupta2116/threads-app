import express, {Router} from 'express';
import {
  createPost,
  updatePost,
  deletePost,
  getUserPosts,
  getPost,
  getFeed,
  likeUnlikePost,
  postComment,
} from '../controller/post.controller.js';
import verifyJWT from '../middlewares/jwt.middleware.js';
const router = Router();

// Move the /feeds route BEFORE the /:postId route
router.route('/').post(verifyJWT, createPost);
router.route('/get-posts/').get(verifyJWT, getUserPosts);
router.route('/get-posts/:username').get(verifyJWT, getUserPosts);
router.route('/deletePost').delete(verifyJWT, deletePost);
router.route('/feeds').get(verifyJWT, getFeed); // Put this BEFORE dynamic routes
router.route('/:postId').get(verifyJWT, getPost).patch(verifyJWT, updatePost);
router.route('/:postId/like').patch(verifyJWT, likeUnlikePost);
router.route('/:postId/comment').patch(verifyJWT, postComment);

export default router;
