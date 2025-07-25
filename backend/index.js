import express from "express";
// import { config } from "dotenv";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import bookmarkRoutes from "./routes/BookMark.js";
import path from "path";
import { fileURLToPath } from "url";
// config({ path: "env" });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envPath = path.resolve(__dirname, ".env");
console.log("Attempting to load env file from:", envPath);
config({ path: envPath });

// Debug environment variables
console.log("Environment Variables:", {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  COOKIE_EXPIRE: process.env.COOKIE_EXPIRE,
  PORT: process.env.PORT,
});

// Create Express app
const server = express();

// Middleware
server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Welcome route
server.get("/", (req, res) => {
  return res.send("Welcome to News Nest server");
});

// Routes
server.use("/api/users", userRoutes);
server.use("/api/news", newsRoutes);
server.use("/api/notes", notesRoutes);
server.use("/api/bookmarks", bookmarkRoutes);

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
