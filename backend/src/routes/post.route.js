import express, { Router } from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getUserPosts,
  getPost,
  getFeed,
  likeUnlikePost,
} from "../controller/post.controller.js";
import verifyJWT from "../middlewares/jwt.middleware.js";
const router = Router();

router.route("/").post(verifyJWT, createPost).get(verifyJWT, getUserPosts); // Add post & get all posts
router
  .route("/:postId")
  .get(verifyJWT, getPost)
  .patch(verifyJWT, updatePost)
  .delete(verifyJWT, deletePost); // Single post operations
router.route("/feed").get(verifyJWT, getFeed);
router.route("/:postId/like").patch(verifyJWT, likeUnlikePost);

export default router;
