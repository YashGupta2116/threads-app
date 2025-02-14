import Post from "../models/posts.model.js";
import User from "../models/user.model.js";

export const createPost = async (req, res) => {
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
    const allUserPosts = await Post.find({ userId }).sort({ createdAt: -1 });

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

export const getFeed = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ success: false, message: "No user found" });
    }

    const followings = user.followings;

    if (followings.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "Follow people to get feed" });
    }

    const feedPosts = await Post.find({ userId: { $in: followings } }).sort({
      createdAt: -1,
    });

    res
      .status(200)
      .json({ success: true, message: "Feed is fetched", feedPosts });
  } catch (error) {
    console.log("Error in getFeed :: post controller ::", error);
  }
};

export const likeUnlikePost = async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const isLiked = post.likeCount.includes(userId);

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      isLiked
        ? { $pull: { likeCount: userId } }
        : { $addToSet: { likeCount: userId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: isLiked ? "Post unliked" : "Post liked",
      likes: updatedPost.likeCount.length, // Return total likes count
      updatedPost,
    });
  } catch (error) {
    console.error("Error in likeUnlikePost:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const postComment = async (req, res) => {
  const { text } = req.body;
  const postId = req.params.postId;
  const userId = req.user._id;
  const { username, userProfilePic } = req.user;

  try {
    if (!postId) {
      return res
        .status(400)
        .json({ success: false, message: "post id missing " });
    }
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User id missing " });
    }

    if (!text) {
      return res
        .status(400)
        .json({ success: false, message: "not text provided" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).json({ success: false, message: "No post found" });
    }

    const fullComment = {
      userId,
      text,
      userProfilePic,
      username,
    };

    post.comments.push(fullComment);

    await post.save();

    res.status(200).json({ success: true, message: "Comment published" });
  } catch (error) {
    console.log("Error in postComment :: post controller :: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
