import express from "express";
import {
  register,
  login,
  logout,
  verifyUser,
  resetPassword,
  forgotPassword,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.get("/verify", isAuthenticated, verifyUser);
router.post("/password/reset", resetPassword);
router.post("/password/forgot", forgotPassword);

// User profile routes
router.get("/profile", isAuthenticated, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

router.put("/profile", isAuthenticated, (req, res) => {
  // Logic to update user profile
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
  });
});

// User preferences routes
router.get("/preferences", isAuthenticated, (req, res) => {
  // Logic to get user preferences
  res.status(200).json({
    success: true,
    preferences: req.user.preferences,
  });
});

router.put("/preferences", isAuthenticated, (req, res) => {
  // Logic to update user preferences
  res.status(200).json({
    success: true,
    message: "Preferences updated successfully",
  });
});

export default router;
