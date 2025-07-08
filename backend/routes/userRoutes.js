import express from "express";
import { getUserProfile, searchUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/search", searchUser);
router.get("/:id", getUserProfile);

export default router;
