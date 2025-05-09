import express from "express";
import {
  register,
  login,
  logout,
  verifyUser,
  forgotPassword,
  updateProfile,
  updatePreferences,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.get("/verify", isAuthenticated, verifyUser);
router.post("/password/forgot", forgotPassword);

// User profile routes
router.get("/profile", isAuthenticated, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

router.put("/profile", isAuthenticated, updateProfile);

// User preferences routes
router.get("/preferences", isAuthenticated, (req, res) => {
  // Logic to get user preferences
  res.status(200).json({
    success: true,
    preferences: req.user.preferences,
  });
});

router.put("/preferences", isAuthenticated, updatePreferences);

export default router;
