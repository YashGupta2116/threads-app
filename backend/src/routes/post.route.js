import express, { Router } from "express";
import { addPost, updatePost } from "../controller/post.controller.js";
import verifyJWT from "../middlewares/jwt.middleware.js";
const router = Router();

router.route("/add-post").post(verifyJWT, addPost);
router.route("/update-post/:postId").patch(verifyJWT, updatePost);

export default router;
