import Bookmark from "../models/BookMark.js";
import validator from "validator"; // Add validator for URL validation

export const bookMarkNews = async (req, res) => {
  const { headline, description, url } = req.body;
  const userId = req.user.id;

  // Validate input
  if (!headline || !description || !url) {
    return res
      .status(400)
      .json({ message: "Headline, description, and URL are required" });
  }
  if (!validator.isURL(url)) {
    return res.status(400).json({ message: "Invalid URL format" });
  }

  try {
    const existingBookmark = await Bookmark.findOne({
      userId,
      "article.url": url,
    });
    if (existingBookmark) {
      return res.status(400).json({ message: "Article already bookmarked" });
    }

    // Create and save the new bookmark
    const bookmark = new Bookmark({
      userId,
      article: { headline, description, url },
    });
    await bookmark.save();

    res.status(201).json({
      message: "Bookmark added successfully",
      data: { bookmark }, // Standardize response
    });
  } catch (error) {
    console.error(`Error adding bookmark for user ${userId}:`, error); // Add context
    res
      .status(500)
      .json({ message: "Failed to add bookmark", error: error.message });
  }
};

export const getAllBookMarkedNews = async (req, res) => {
  const userId = req.user.id;

  try {
    const bookmarks = await Bookmark.find({ userId }).lean();
    res.status(200).json({
      message: "Bookmarks fetched successfully",
      data: { bookmarks }, // Standardize response
    });
  } catch (error) {
    console.error(`Error fetching bookmarks for user ${userId}:`, error); // Add context
    res
      .status(500)
      .json({ message: "Failed to fetch bookmarks", error: error.message });
  }
};

export const deleteBookMarkedNews = async (req, res) => {
  const bookmarkId = req.params.id;
  const userId = req.user.id;

  try {
    const bookmark = await Bookmark.findOneAndDelete({
      _id: bookmarkId,
      userId,
    });

    if (!bookmark) {
      return res
        .status(404)
        .json({ message: "Bookmark not found or not authorized" });
    }

    res.status(200).json({
      message: "Bookmark removed successfully",
      data: {}, // Standardize response
    });
  } catch (error) {
    console.error(
      `Error deleting bookmark ${bookmarkId} for user ${userId}:`,
      error
    ); // Add context
    res
      .status(500)
      .json({ message: "Failed to remove bookmark", error: error.message });
  }
};
