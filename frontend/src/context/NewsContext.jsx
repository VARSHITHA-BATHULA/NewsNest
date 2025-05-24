import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create the context
const NewsContext = createContext();

// News API configuration (use your actual API key)
const NEWS_API_KEY = "1c87cf069f9447ae802b850270708399"; // Replace with your actual API key

export const NewsProvider = ({ children }) => {
  const [headlines, setHeadlines] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch headlines from NewsAPI
  const fetchHeadlines = async () => {
    setIsLoading(true);
    try {
      // You can change the country or category as needed
      const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
        params: {
          country: "us", // or 'in' for India, etc.
          apiKey: NEWS_API_KEY,
          pageSize: 5, // Limit to 5 headlines
        },
      });

      // Transform the API response to match our existing structure
      const formattedHeadlines = response.data.articles.map((article) => ({
        source: article.source.name,
        headline: article.title,
        url: article.url,
        description: article.description,
        publishedAt: article.publishedAt,
      }));

      setHeadlines(formattedHeadlines);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to fetch headlines");
      setIsLoading(false);
      toast.error("Could not load news headlines");
    }
  };

  // Bookmark functionality
  const toggleBookmark = (article) => {
    setBookmarks((prevBookmarks) => {
      // Check if article is already bookmarked
      const isBookmarked = prevBookmarks.some(
        (bookmark) => bookmark.headline === article.headline
      );

      if (isBookmarked) {
        // Remove bookmark
        toast.info("Removed from bookmarks");
        return prevBookmarks.filter(
          (bookmark) => bookmark.headline !== article.headline
        );
      } else {
        // Add bookmark
        toast.success("Added to bookmarks");
        return [...prevBookmarks, article];
      }
    });
  };

  // Load bookmarks from localStorage on initial render
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("newsBookmarks");
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("newsBookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Fetch headlines on initial render
  useEffect(() => {
    fetchHeadlines();
  }, []);

  return (
    <NewsContext.Provider
      value={{
        headlines,
        bookmarks,
        isLoading,
        error,
        fetchHeadlines,
        toggleBookmark,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

// Custom hook to use the NewsContext
export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNews must be used within a NewsProvider");
  }
  return context;
};
