import Comment from "../models/comment.js";
import Post from "../models/post.js";

const addComment = async (req, res) => {
  const postId = req.params.postId;
  const { text } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "post not found" });

    const comment = await Comment.create({
      text,
      owner: req.user._id,
      post: postId,
    });

    post.comments.push(comment._id);
    await post.save();

    const populatedComment = await comment.populate("owner", "username");
    res.status(200).json({
      message: "Commented Successfully",
      populatedComment,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "failed to add comment", error: err.message });
  }
};

// get all comments of a specific post
const getComments = async (req, res) => {
  const postId = req.params.postId;
  try {
    const comments = await Comment.find({ post: postId })
      .populate("owner", "username")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "failed to fetch comments", error: err.message });
  }
};

export { addComment, getComments };
