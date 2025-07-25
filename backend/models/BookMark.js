// const mongoose = require("mongoose");
import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    article: {
      headline: { type: String, required: true },
      description: { type: String, required: true },
      url: { type: String, required: true },
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Add index for better query performance
bookmarkSchema.index({ userId: 1, "article.url": 1 });
export default mongoose.model("Bookmark", bookmarkSchema);
