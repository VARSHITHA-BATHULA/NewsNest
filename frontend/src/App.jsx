import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const [activeSection, setActiveSection] = useState("news");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sample news data
  const newsItems = [
    {
      source: "The New York Times",
      headline: "Global Climate Summit Produces New Commitments",
    },
    {
      source: "The Washington Post",
      headline: "Tech Giants Announce Major AI Ethics Initiative",
    },
    {
      source: "The Guardian",
      headline: "Healthcare Breakthrough: New Treatment Shows Promise",
    },
    {
      source: "The Wall Street Journal",
      headline: "Economic Outlook Remains Strong Despite Challenges",
    },
    {
      source: "BBC News",
      headline: "International Space Station Marks 25 Years in Orbit",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] transition-colors duration-200">
      <Navbar  zIndex="10"/>
      <div className="flex">
        <Sidebar
          zIndex="1"
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        <main
          className={`flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${
            isCollapsed ? "ml-16" : "ml-64"
          } transition-all duration-300`}
        >
          <h1 className="text-3xl font-bold mb-6 text-[var(--headlines)] transition-colors duration-200">
            Welcome to NewsNest
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main News Section */}
            <div className="col-span-2 space-y-6">
              <section className="bg-[var(--card-background)] rounded-lg shadow p-6 transition-colors duration-200">
                <h2 className="text-2xl font-semibold mb-4 text-[var(--headlines)] transition-colors duration-200">
                  Top Headlines
                </h2>
                <div className="space-y-4">
                  {/* News items */}
                  {newsItems.map((item, index) => (
                    <div
                      key={index}
                      className="border-b border-[var(--dividers)] pb-4 last:border-0 transition-colors duration-200"
                    >
                      <p className="text-sm text-[var(--secondary)] mb-1 transition-colors duration-200">
                        {item.source}
                      </p>
                      <h3 className="text-lg font-medium hover:underline cursor-pointer text-[var(--headlines)] transition-colors duration-200">
                        {item.headline}
                      </h3>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-[var(--card-background)] rounded-lg shadow p-6 transition-colors duration-200">
                <h2 className="text-2xl font-semibold mb-4 text-[var(--headlines)] transition-colors duration-200">
                  Featured Story
                </h2>
                <div className="rounded-lg bg-[var(--highlight)] p-4 transition-colors duration-200">
                  <p className="text-sm text-[var(--secondary)] mb-1 transition-colors duration-200">
                    Special Report
                  </p>
                  <h3 className="text-xl font-semibold text-[var(--headlines)] mb-2 transition-colors duration-200">
                    The Changing Landscape of Competitive Exams in 2025
                  </h3>
                  <p className="text-[var(--text-primary)] mb-4 transition-colors duration-200">
                    A comprehensive look at how entrance examinations are
                    evolving with technology and changing educational paradigms.
                  </p>
                  <button className="px-4 py-2 bg-[var(--accent)] text-white rounded-md hover:opacity-90 transition">
                    Read Full Story
                  </button>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="col-span-1 space-y-6">
              <section className="bg-[var(--card-background)] rounded-lg shadow p-6 transition-colors duration-200">
                <h2 className="text-xl font-semibold mb-4 text-[var(--headlines)] transition-colors duration-200">
                  Personal Notes
                </h2>
                <textarea
                  className="w-full p-3 border border-[var(--dividers)] rounded-md bg-[var(--input-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--headlines)] text-[var(--text-primary)] transition-colors duration-200"
                  placeholder="Add your notes here..."
                  rows={5}
                ></textarea>
                <button className="mt-3 px-4 py-2 bg-[var(--accent)] text-white rounded-md hover:opacity-90 transition">
                  Save Note
                </button>
              </section>

              <section className="bg-[var(--card-background)] rounded-lg shadow p-6 transition-colors duration-200">
                <h2 className="text-xl font-semibold mb-4 text-[var(--headlines)] transition-colors duration-200">
                  Daily Briefing
                </h2>
                <p className="text-[var(--text-primary)] mb-4 transition-colors duration-200">
                  Your personalized news digest will appear here once you select
                  your preferred sources.
                </p>
                <button className="px-4 py-2 border border-[var(--headlines)] text-[var(--headlines)] rounded-md hover:bg-[var(--highlight)] transition">
                  Customize Sources
                </button>
              </section>

              <section className="bg-[var(--card-background)] rounded-lg shadow p-6 transition-colors duration-200">
                <h2 className="text-xl font-semibold mb-4 text-[var(--headlines)] transition-colors duration-200">
                  Exam Alerts
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-[var(--highlight)] rounded transition-colors duration-200">
                    <span className="text-[var(--text-primary)] transition-colors duration-200">
                      UPSC Prelims
                    </span>
                    <span className="text-sm text-[var(--accent)]">
                      2 months
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[var(--highlight)] rounded transition-colors duration-200">
                    <span className="text-[var(--text-primary)] transition-colors duration-200">
                      Banking Exams
                    </span>
                    <span className="text-sm text-[var(--accent)]">
                      5 weeks
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[var(--highlight)] rounded transition-colors duration-200">
                    <span className="text-[var(--text-primary)] transition-colors duration-200">
                      SSC Combined
                    </span>
                    <span className="text-sm text-[var(--accent)]">
                      3 months
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      <footer className="bg-[var(--card-background)] border-t border-[var(--dividers)] mt-12 py-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-[var(--secondary)] transition-colors duration-200">
            <p>© 2025 NewsNest. All rights reserved.</p>
            <p className="mt-2">
              The ultimate news aggregator for exam preparation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
