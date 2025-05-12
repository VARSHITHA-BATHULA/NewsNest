import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import savedNewsRoutes from "./routes/savedNewsRoutes.js";

config({ path: "./env/config.env" });

// Create Express app
const server = express();

// Middleware
server.use(express.json());
server.use(cookieParser());
server.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


// Welcome route
server.get("/", (req, res) => {
  return res.send("Welcome to News Nest server");
});

// Routes
server.use("/api/users", userRoutes);
server.use("/api/news", newsRoutes);
server.use("/api/notes", notesRoutes);
server.use("/api/saved-news", savedNewsRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
