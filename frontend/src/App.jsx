// App.jsx
import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SavedNotes from "./components/SavedNotes";
import Bookmarks from "./components/Bookmarks";
import { useNews } from "./context/NewsContext";
import News from "./components/News";

function App() {
  const [activeSection, setActiveSection] = useState("news");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteTags, setNoteTags] = useState("");

  const { headlines, isLoading, error, toggleBookmark, bookmarks } = useNews();

  if (isLoading)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--background)" }}
      >
        <p
          className="text-center text-lg"
          style={{ color: "var(--text-primary)" }}
        >
          Loading news...
        </p>
      </div>
    );

  if (error)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--background)" }}
      >
        <p className="text-center text-lg" style={{ color: "var(--accent)" }}>
          {error}
        </p>
      </div>
    );

  const saveNote = async () => {
    if (!noteTitle || !noteContent) {
      toast.error("Title and content are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/notes",
        {
          title: noteTitle,
          content: noteContent,
          tags: noteTags.split(",").map((tag) => tag.trim()),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
          },
        }
      );

      toast.success("Note saved successfully");
      setNoteTitle("");
      setNoteContent("");
      setNoteTags("");
    } catch (error) {
      toast.error("Failed to save note");
    }
  };

  return (
    <Router>
      <div
        className="min-h-screen transition-colors duration-200"
        style={{ backgroundColor: "var(--background)" }}
      >
        <Navbar />
        <div className="flex pt-16 min-h-[calc(100vh-4rem)]">
          <Sidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />

          <Routes>
            <Route
              path="/"
              element={
                <main
                  className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ${
                    isCollapsed ? "ml-16" : "ml-64"
                  } w-full`}
                >
                  <div className="max-w-7xl mx-auto " style={{ width: "100%" }}>
                    <h1
                      className="text-3xl sm:text-4xl text-center font-bold mb-6 sm:mb-8"
                      style={{ color: "var(--headlines)" }}
                    >
                      Welcome to NewsNest
                    </h1>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                      {/* News Section */}
                      <div className="xl:col-span-2 space-y-6">
                        <section
                          className="card rounded-lg shadow p-4 sm:p-6"
                          style={{ backgroundColor: "var(--card-background)" }}
                        >
                          <h2
                            className="text-xl sm:text-2xl font-semibold mb-4"
                            style={{ color: "var(--headlines)" }}
                          >
                            Top Headlines
                          </h2>
                          <div className="space-y-6">
                            {headlines && headlines.length > 0 ? (
                              headlines.map((article, index) => (
                                <div
                                  key={index}
                                  className="pb-4 last:border-b-0"
                                  style={{
                                    borderBottom:
                                      index !== headlines.length - 1
                                        ? "1px solid var(--dividers)"
                                        : "none",
                                  }}
                                >
                                  <h3
                                    className="text-lg sm:text-xl font-medium leading-tight news-card"
                                    style={{ color: "var(--headlines)" }}
                                  >
                                    {article.headline}
                                  </h3>
                                  <p
                                    className="mt-2 text-sm sm:text-base leading-relaxed"
                                    style={{ color: "var(--text-primary)" }}
                                  >
                                    {article.description}
                                  </p>
                                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 gap-2">
                                    <a
                                      href={article.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:underline text-sm font-medium transition-opacity duration-200 hover:opacity-85"
                                      style={{ color: "var(--accent)" }}
                                    >
                                      Read more
                                    </a>
                                    <button
                                      onClick={() => toggleBookmark(article)}
                                      className="px-3 py-1.5 rounded-md text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
                                      style={{
                                        backgroundColor: bookmarks.some(
                                          (b) => b.url === article.url
                                        )
                                          ? "#10B981"
                                          : "var(--accent)",
                                      }}
                                    >
                                      {bookmarks.some(
                                        (b) => b.url === article.url
                                      )
                                        ? "Bookmarked"
                                        : "Bookmark"}
                                    </button>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p
                                className="text-center py-8"
                                style={{ color: "var(--secondary)" }}
                              >
                                No headlines available
                              </p>
                            )}
                          </div>
                        </section>

                        {/* Featured Story */}
                        <section
                          className="card rounded-lg shadow p-4 sm:p-6"
                          style={{ backgroundColor: "var(--card-background)" }}
                        >
                          <h2
                            className="text-xl sm:text-2xl font-semibold mb-4"
                            style={{ color: "var(--headlines)" }}
                          >
                            Featured Story
                          </h2>
                          <div
                            className="rounded-lg p-4 sm:p-6"
                            style={{ backgroundColor: "var(--highlight)" }}
                          >
                            <p
                              className="text-xs sm:text-sm mb-2 font-medium"
                              style={{ color: "var(--secondary)" }}
                            >
                              Special Report
                            </p>
                            <h3
                              className="text-lg sm:text-xl font-semibold mb-3 leading-tight"
                              style={{ color: "var(--headlines)" }}
                            >
                              The Changing Landscape of Competitive Exams in
                              2025
                            </h3>
                            <p
                              className="mb-4 text-sm sm:text-base leading-relaxed"
                              style={{ color: "var(--text-primary)" }}
                            >
                              A comprehensive look at how entrance examinations
                              are evolving with technology and changing
                              educational paradigms.
                            </p>
                            <button
                              className="btn px-4 py-2 text-white rounded-md transition-all duration-200 text-sm font-medium hover:opacity-90"
                              style={{ backgroundColor: "var(--accent)" }}
                            >
                              Read Full Story
                            </button>
                          </div>
                        </section>
                      </div>

                      {/* Sidebar Sections */}
                      <div className="xl:col-span-1 space-y-6">
                        {/* Personal Notes */}
                        <section
                          className="card rounded-lg shadow p-4 sm:p-6"
                          style={{ backgroundColor: "var(--card-background)" }}
                        >
                          <h2
                            className="text-lg sm:text-xl font-semibold mb-4"
                            style={{ color: "var(--headlines)" }}
                          >
                            Personal Notes
                          </h2>
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={noteTitle}
                              onChange={(e) => setNoteTitle(e.target.value)}
                              placeholder="Note Title"
                              className="w-full p-3 rounded-md text-sm transition-all duration-200 focus:outline-none focus:ring-2"
                              style={{
                                backgroundColor: "var(--input-bg)",
                                color: "var(--text-primary)",
                                border: "1px solid var(--dividers)",
                                "--tw-ring-color": "var(--headlines)",
                              }}
                            />
                            <textarea
                              value={noteContent}
                              onChange={(e) => setNoteContent(e.target.value)}
                              placeholder="Note Content"
                              className="w-full p-3 rounded-md text-sm resize-none transition-all duration-200 focus:outline-none focus:ring-2 personal-notes"
                              style={{
                                backgroundColor: "var(--input-bg)",
                                color: "var(--text-primary)",
                                border: "1px solid var(--dividers)",
                                "--tw-ring-color": "var(--headlines)",
                              }}
                              rows="4"
                            />
                            <input
                              type="text"
                              value={noteTags}
                              onChange={(e) => setNoteTags(e.target.value)}
                              placeholder="Tags (comma-separated)"
                              className="w-full p-3 rounded-md text-sm transition-all duration-200 focus:outline-none focus:ring-2"
                              style={{
                                backgroundColor: "var(--input-bg)",
                                color: "var(--text-primary)",
                                border: "1px solid var(--dividers)",
                                "--tw-ring-color": "var(--headlines)",
                              }}
                            />
                            <button
                              onClick={saveNote}
                              className="w-full px-4 py-3 text-white rounded-md font-medium text-sm btn transition-all duration-200 hover:opacity-90"
                              style={{ backgroundColor: "var(--accent)" }}
                            >
                              Save Note
                            </button>
                          </div>
                        </section>

                        {/* Daily Briefing */}
                        <section
                          className="card rounded-lg shadow p-4 sm:p-6"
                          style={{ backgroundColor: "var(--card-background)" }}
                        >
                          <h2
                            className="text-lg sm:text-xl font-semibold mb-4"
                            style={{ color: "var(--headlines)" }}
                          >
                            Daily Briefing
                          </h2>
                          <div className="text-center py-6">
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                              style={{ backgroundColor: "var(--highlight)" }}
                            >
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                style={{ color: "var(--secondary)" }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </div>
                            <p
                              className="text-sm"
                              style={{ color: "var(--text-primary)" }}
                            >
                              Your daily summary will appear here.
                            </p>
                          </div>
                        </section>

                        {/* Exam Alerts */}
                        <section
                          className="card rounded-lg shadow p-4 sm:p-6"
                          style={{ backgroundColor: "var(--card-background)" }}
                        >
                          <h2
                            className="text-lg sm:text-xl font-semibold mb-4"
                            style={{ color: "var(--headlines)" }}
                          >
                            Exam Alerts
                          </h2>
                          <div className="text-center py-6">
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                              style={{ backgroundColor: "var(--highlight)" }}
                            >
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                style={{ color: "var(--secondary)" }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                                />
                              </svg>
                            </div>
                            <p
                              className="text-sm"
                              style={{ color: "var(--text-primary)" }}
                            >
                              Stay updated with the latest exam notifications.
                            </p>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </main>
              }
            />
            <Route path="/news" element={<News />} />
            <Route path="/savednotes" element={<SavedNotes />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Routes>
        </div>

        <footer
          className="mt-12 py-8"
          style={{
            backgroundColor: "var(--card-background)",
            borderTop: "1px solid var(--dividers)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center" style={{ color: "var(--secondary)" }}>
              <p>© 2025 NewsNest. All rights reserved.</p>
              <p className="mt-2">
                The ultimate news aggregator for exam preparation.
              </p>
            </div>
          </div>
        </footer>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
