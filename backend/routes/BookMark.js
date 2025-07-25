import express from "express";
import {
  bookMarkNews,
  getAllBookMarkedNews,
  deleteBookMarkedNews, // Fixed naming
} from "../controllers/BookMark.js"; // Consistent file naming
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// All routes require authentication
router.use(isAuthenticated);

// Routes for bookmarks
router.post("/", bookMarkNews); // Removed redundant isAuthenticated
router.get("/", getAllBookMarkedNews);
router.delete("/:id", deleteBookMarkedNews);

export default router;
