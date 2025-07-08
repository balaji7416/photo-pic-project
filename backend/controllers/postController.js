import Post from "../models/post.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import User from "../models/user.js";

const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const filePath = req.file.path;

    const result = await cloudinary.uploader.upload(filePath, {
      folder: "phototracker",
    });

    const post = await Post.create({
      imageUrl: result.secure_url,
      caption: caption,
      owner: req.user._id,
    });

    fs.unlinkSync(filePath);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Upload Failed", error: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("owner","username createdAt").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch posts", error: err.message });
  }
};

const getUserPosts = async (req, res) => {
  const userId = req.params.userId;

  try {
    const posts = await Post.find({ owner: userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch user's posts", error: err.message });
  }
};

const toggleLikePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: "post not found" });

    const liked = post.likes.includes(userId);
    if (liked) {
      post.likes = post.likes.filter(
        (id) => id.toString() != userId.toString()
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.status(200).json({
      message: liked ? "Unliked Successfully" : "Liked Successfully",
      likesCount: post.likes.length,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: `failed to like/unlike post`, error: err.message });
  }
};

export { createPost, getUserPosts, getAllPosts, toggleLikePost };
