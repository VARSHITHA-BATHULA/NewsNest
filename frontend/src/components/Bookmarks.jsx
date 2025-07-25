import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Add for redirect

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const userId = localStorage.getItem("UserId");
  const navigate = useNavigate(); // For redirect on auth failure

  const fetchBookmarks = async () => {
    if (!userId) {
      toast.error("User not authenticated. Please log in.");
      navigate("/login"); // Redirect to login
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookmarks`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
          },
          params: { userId },
        }
      );
      setBookmarks(response.data.bookmarks || []);
    } catch (error) {
      console.error("Error fetching bookmarks:", error); // Log error for debugging
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        navigate("/login");
      } else {
        toast.error("Failed to fetch bookmarks");
      }
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [userId]); // Add userId to dependency array

  return (
    <div className="w-full max-w-[1100px] mt-6 mx-auto p-4 sm:p-6 bg-[var(--card-background)] rounded-lg shadow sm:ml-16 sm:mr-4 lg:ml-64 lg:mr-8">
      <h2 className="text-2xl sm:text-3xl text-center font-semibold mb-7 text-[var(--headlines)]">
        Bookmarks
      </h2>
      {bookmarks.length === 0 ? (
        <p className="text-center text-[var(--text-primary)]">
          No bookmarks available.
        </p>
      ) : (
        <ul>
          {bookmarks.map((bookmark) => (
            <li
              key={bookmark._id} // Use _id instead of index
              className="border-b border-[var(--dividers)] pb-2 mb-2"
            >
              <a
                href={bookmark.article.url} // Access nested article.url
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg sm:text-xl font-medium text-[var(--headlines)] hover:underline"
                aria-label={`Read more about ${bookmark.article.headline}`} // Improve accessibility
              >
                {bookmark.article.headline} // Access nested article.headline
              </a>
              <p className="text-sm sm:text-base text-[var(--text-primary)]">
                {bookmark.article.description} // Access nested
                article.description
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookmarks;
