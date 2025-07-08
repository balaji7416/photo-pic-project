import User from "../models/user.js";

const searchUser = async (req, res) => {
  const query = req.query.q;
  try {
    const users = await User.find({
      username: { $regex: query, $options: "i" },
    }).select("username");

    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "User search failed: ", error: err.message });
  }
};

const getUserProfile = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select("username createdAt");

    if (!user) return res.status(404).json({ message: "user not found" });

    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "failed to fetch profile", error: err.message });
  }
};

export { searchUser, getUserProfile };
