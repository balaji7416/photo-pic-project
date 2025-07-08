import { RegisterUser, LoginUser } from "../controllers/authController.js";

import express from "express";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);

export default router;
