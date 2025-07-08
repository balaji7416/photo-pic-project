import express from "express";
import {
  createPost,
  getAllPosts,
  getUserPosts,
  toggleLikePost,
} from "../controllers/postController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), createPost);
router.get("/", getAllPosts);
router.get("/user/:userId", getUserPosts);
router.post("/:postId/like", protect, toggleLikePost);

export default router;
