import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // express automatically converts headers to lowercase, so we can use authorization instead of Authorization

    if (authHeader && authHeader.startsWith("Bearer")) {
      let token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } else {
      res.status(401).json({ message: "Unauthorized, token missing" }); // status code 401 indicates that the request has not been applied because it lacks valid authentication credentials for the target resource
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default protect;
