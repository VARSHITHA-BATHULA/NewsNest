import axios from "axios";
import { createError } from "../utils/error.js";

// Indian news sources with their API endpoints
const newsSources = [
  {
    id: "times-of-india",
    name: "The Times of India",
    endpoint: "https://newsapi.org/v2/top-headlines",
    params: { sources: "the-times-of-india" },
  },
  {
    id: "hindustan-times",
    name: "Hindustan Times",
    endpoint: "https://newsapi.org/v2/top-headlines",
    params: { sources: "the-hindu" },
  },
  {
    id: "indian-express",
    name: "The Indian Express",
    endpoint: "https://newsapi.org/v2/top-headlines",
    params: { sources: "the-indian-express" },
  },
  {
    id: "ndtv",
    name: "NDTV",
    endpoint: "https://newsapi.org/v2/top-headlines",
    params: { sources: "ndtv" },
  },
  {
    id: "india-today",
    name: "India Today",
    endpoint: "https://newsapi.org/v2/top-headlines",
    params: { sources: "india-today" },
  },
];

// Helper function to fetch news from all sources
const fetchFromSources = async (category = "all") => {
  try {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      throw createError(500, "NEWS_API_KEY environment variable is not set");
    }

    const result = await Promise.all(
      newsSources.map(async (source) => {
        try {
          // Set up the API request parameters
          const params = {
            ...source.params,
            apiKey,
            country: "in", // Country code for India
          };

          // Add category if specified and not "all"
          if (category !== "all") {
            params.category = category;
          }

          // Make the API request
          const response = await axios.get(source.endpoint, { params });

          // Transform the API response to match our format
          const headlines = response.data.articles
            .slice(0, 8) // Limit to 8 headlines per source
            .map((article) => ({
              id: article.url, // Using URL as a unique ID
              title: article.title,
              summary: article.description || "No description available",
              publishedAt: article.publishedAt,
              imageUrl:
                article.urlToImage ||
                "https://via.placeholder.com/300x200?text=No+Image",
              category:
                category === "all" ? article.category || "general" : category,
              url: article.url,
            }));

          return {
            source: {
              id: source.id,
              name: source.name,
            },
            headlines,
          };
        } catch (error) {
          console.error(`Error fetching from ${source.name}:`, error.message);
          // Return empty headlines if this particular source fails
          return {
            source: {
              id: source.id,
              name: source.name,
            },
            headlines: [],
            error: `Failed to fetch from ${source.name}: ${error.message}`,
          };
        }
      })
    );

    return result;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw createError(500, "Failed to fetch news from sources");
  }
};

// Get all news from all sources
export const getAllNews = async (req, res, next) => {
  try {
    const newsData = await fetchFromSources("all");
    res.status(200).json({
      success: true,
      count: newsData.length,
      data: newsData,
    });
  } catch (error) {
    next(error);
  }
};

// Get top news from all sources
export const getTopNews = async (req, res, next) => {
  try {
    const newsData = await fetchFromSources("general");
    res.status(200).json({
      success: true,
      count: newsData.length,
      data: newsData,
    });
  } catch (error) {
    next(error);
  }
};

// Get sports news from all sources
export const getSportsNews = async (req, res, next) => {
  try {
    const newsData = await fetchFromSources("sports");
    res.status(200).json({
      success: true,
      count: newsData.length,
      data: newsData,
    });
  } catch (error) {
    next(error);
  }
};

// Get entertainment news from all sources
export const getEntertainmentNews = async (req, res, next) => {
  try {
    const newsData = await fetchFromSources("entertainment");
    res.status(200).json({
      success: true,
      count: newsData.length,
      data: newsData,
    });
  } catch (error) {
    next(error);
  }
};

// Get current affairs news from all sources
export const getCurrentAffairsNews = async (req, res, next) => {
  try {
    // For current affairs, we'll use the "business" and "politics" categories
    // and combine them
    const businessNews = await fetchFromSources("business");
    const politicsNews = await fetchFromSources("politics");

    // Combine and format the results
    const newsData = [...businessNews, ...politicsNews];

    res.status(200).json({
      success: true,
      count: newsData.length,
      data: newsData,
    });
  } catch (error) {
    next(error);
  }
};

// Get full article by source and article ID
export const getFullArticle = async (req, res, next) => {
  try {
    const { sourceId, articleId } = req.params;

    // Find the source
    const source = newsSources.find((s) => s.id === sourceId);
    if (!source) {
      return next(createError(404, "News source not found"));
    }

    // In a real implementation, the articleId should be the URL or unique identifier
    // for the article. We'll try to fetch it using the URL.
    try {
      // For a proper implementation, you might need to use a web scraping service
      // or a specific API endpoint to get the full article content.
      // Most news APIs don't provide full article content due to copyright.

      // For now, we'll make a request to get the article details
      const apiKey = process.env.NEWS_API_KEY;

      if (!apiKey) {
        throw createError(500, "NEWS_API_KEY environment variable is not set");
      }

      // Since NewsAPI doesn't have an endpoint for individual articles by ID,
      // we'll try to find it by searching with the exact title or URL
      const response = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          apiKey,
          domains: articleId.includes("http")
            ? new URL(articleId).hostname
            : undefined,
          url: articleId.includes("http") ? articleId : undefined,
          qInTitle: !articleId.includes("http") ? articleId : undefined,
          language: "en",
        },
      });

      if (response.data.articles && response.data.articles.length > 0) {
        const article = response.data.articles[0];

        const fullArticle = {
          id: article.url,
          source: {
            id: source.id,
            name: source.name,
          },
          title: article.title,
          content:
            article.content ||
            "Full content not available through the API. Please visit the original article for complete content.",
          author: article.author || "Unknown",
          publishedAt: article.publishedAt,
          imageUrl:
            article.urlToImage ||
            "https://via.placeholder.com/800x400?text=No+Image",
          category: article.category || "general",
          url: article.url,
        };

        res.status(200).json({
          success: true,
          data: fullArticle,
        });
      } else {
        throw createError(404, "Article not found");
      }
    } catch (error) {
      console.error("Error fetching full article:", error);
      return next(createError(500, "Failed to fetch the full article"));
    }
  } catch (error) {
    next(error);
  }
};
