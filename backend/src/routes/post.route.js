import express, { Router } from "express";
import {
  addPost,
  updatePost,
  deletePost,
  getUserPosts,
  getPost,
} from "../controller/post.controller.js";
import verifyJWT from "../middlewares/jwt.middleware.js";
const router = Router();

router.route("/add-post").post(verifyJWT, addPost);
router.route("/update-post/:postId").patch(verifyJWT, updatePost);
router.route("/delete-post/:postId").delete(verifyJWT, deletePost);
router.route("/get-all-posts").get(verifyJWT, getUserPosts);
router.route("/get-post/:postId").get(verifyJWT, getPost);

export default router;
