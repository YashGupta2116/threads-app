import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

import connectDB from "./DB/db.js";
import app from "./app.js";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("app is listening on port : ", PORT);
  connectDB();
});

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

// routes

import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import messageRoutes from "./routes/message.route.js";

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
