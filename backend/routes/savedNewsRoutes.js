import express from "express";
import {
  saveNews,
  getAllSavedNews,
  deleteSavedNews,
} from "../controllers/savedNewsController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// All saved news routes require authentication
router.use(isAuthenticated);

// Routes for saved news
router.post("/", saveNews);
router.get("/", getAllSavedNews);
router.delete("/:id", deleteSavedNews);

export default router;
