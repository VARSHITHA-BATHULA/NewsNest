import express from "express";
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// All notes routes require authentication
router.use(isAuthenticated);

// CRUD operations for notes
router.post("/", createNote);
router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
