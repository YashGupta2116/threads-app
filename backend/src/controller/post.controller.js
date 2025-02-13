import Post from "../models/posts.model.js";

export const addPost = async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User not authorized" });
  }

  const {
    content,
    image = "",
    likeCount = [],
    shared = 0,
    comments = [],
  } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }
  if (!Array.isArray(likeCount)) {
    return res.status(400).json({ message: "Likes must be an array" });
  }
  if (!Array.isArray(comments)) {
    return res.status(400).json({ message: "Comments must be an array" });
  }
  if (typeof shared !== "number") {
    return res.status(400).json({ message: "Shared count must be a number" });
  }

  try {
    const newPost = new Post({
      userId,
      content,
      image,
      likeCount,
      shared,
      comments,
    });

    await newPost.save();

    return res.status(201).json({
      success: true,
      message: "Post was created",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatePost = async (req, res) => {
  const postId = req.params.postId;
  const { content, image } = req.body;

  try {
    // Create an update object and only include provided fields
    const updateData = {};
    if (content) updateData.content = content;
    if (image !== undefined) updateData.image = image;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: updateData },
      { new: true } // Returns the updated document
    );

    if (!updatedPost) {
      return res
        .status(400)
        .json({ success: false, message: "Post was not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Post updated", post: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", post });
  } catch (error) {
    console.error("Error in deletePost controller ::", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserPosts = async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User not authorized" });
  }

  try {
    const allUserPosts = await Post.findOne({ userId });

    if (!allUserPosts) {
      return res.status(200).json({ success: true, message: "No user posts" });
    }

    res
      .status(200)
      .json({ success: true, message: "User posts fetcehd", allUserPosts });
  } catch (error) {
    console.log("Internal Server error");
    return res
      .status(500)
      .json({ success: false, message: "error in getUserPosts" });
  }
};

export const getPost = async (req, res) => {
  const postId = req.params.postId;

  if (!postId) {
    return res
      .status(400)
      .json({ success: false, message: "No postId was provided" });
  }

  try {
    const userPost = await Post.findById(postId);

    if (!userPost) {
      return res
        .status(400)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "User Post fetched successfully",
      userPost,
    });
  } catch (error) {
    console.log("Internal Server error");
    return res
      .status(500)
      .json({ success: false, message: "error in getPost" });
  }
};
