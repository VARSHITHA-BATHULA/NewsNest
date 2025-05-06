import mongoose from "mongoose";

const savedNewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter news title"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
  },
  url: {
    type: String,
    required: [true, "Please enter news URL"],
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  source: {
    type: String,
    required: [true, "Please enter news source"],
    enum: ["timesofindia", "hindu", "bbc", "guardian", "reuters", "other"],
  },
  category: {
    type: String,
    default: "general",
    enum: [
      "general",
      "politics",
      "business",
      "technology",
      "entertainment",
      "sports",
      "science",
      "health",
      "other",
    ],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a compound index on url and user to prevent duplicate saves
savedNewsSchema.index({ url: 1, user: 1 }, { unique: true });

const SavedNews = mongoose.model("SavedNews", savedNewsSchema);

export default SavedNews;
