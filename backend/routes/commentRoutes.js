import { addComment, getComments } from "../controllers/commentController.js";
import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:postId", protect, addComment);
router.get("/:postId", getComments);

export default router;
