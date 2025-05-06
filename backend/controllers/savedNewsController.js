import SavedNews from "../models/savedNewsModel.js";

// Save a news article
export const saveNews = async (req, res) => {
  try {
    const {
      title,
      description,
      content,
      url,
      imageUrl,
      publishedAt,
      source,
      category,
    } = req.body;

    if (!title || !url || !source) {
      return res.status(400).json({
        success: false,
        message: "Title, URL, and source are required",
      });
    }

    // Check if the news is already saved by the user
    const existingNews = await SavedNews.findOne({
      url,
      user: req.user._id,
    });

    if (existingNews) {
      return res.status(400).json({
        success: false,
        message: "News article already saved",
      });
    }

    const savedNews = await SavedNews.create({
      title,
      description,
      content,
      url,
      imageUrl,
      publishedAt: publishedAt || new Date(),
      source,
      category: category || "general",
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      savedNews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all saved news for a user
export const getAllSavedNews = async (req, res) => {
  try {
    const { source, category, sortBy } = req.query;

    // Build query
    const query = { user: req.user._id };

    if (source) {
      query.source = source;
    }

    if (category) {
      query.category = category;
    }

    // Set sort options
    const sortOptions = {};
    if (sortBy === "oldest") {
      sortOptions.savedAt = 1;
    } else {
      // Default: newest first
      sortOptions.savedAt = -1;
    }

    const savedNews = await SavedNews.find(query)
      .sort(sortOptions)
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      count: savedNews.length,
      savedNews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a saved news article
export const deleteSavedNews = async (req, res) => {
  try {
    const savedNewsId = req.params.id;

    const savedNews = await SavedNews.findById(savedNewsId);

    if (!savedNews) {
      return res.status(404).json({
        success: false,
        message: "Saved news not found",
      });
    }

    // Check if the saved news belongs to the user
    if (savedNews.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this saved news",
      });
    }

    await SavedNews.findByIdAndDelete(savedNewsId);

    res.status(200).json({
      success: true,
      message: "Saved news deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
