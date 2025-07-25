// Sidebar.jsx
import { Link } from "react-router-dom";
import {
  Newspaper,
  BookmarkCheck,
  NotepadText,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const Sidebar = ({
  activeSection,
  setActiveSection,
  isCollapsed,
  setIsCollapsed,
}) => {
  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: <Newspaper size={20} />,
      path: "/",
    },
    {
      id: "news",
      label: "News",
      icon: <Newspaper size={20} />,
      path: "/news",
    },
    {
      id: "saved-notes",
      label: "Saved Notes",
      icon: <NotepadText size={20} />,
      path: "/savednotes",
    },
    {
      id: "bookmarks",
      label: "Bookmarks",
      icon: <BookmarkCheck size={20} />,
      path: "/bookmarks",
    },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-[var(--card-background)] border-r border-[var(--dividers)] transition-all duration-300 flex flex-col z-10 ${
        isCollapsed ? "w-16" : "w-16 sm:w-64"
      }`}
    >
      {/* Main menu items */}
      <div className="flex-1 pt-6">
        <ul className="space-y-2 px-2 sm:px-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link to={item.path}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center w-full p-2 sm:p-3 rounded-md transition-colors duration-200 hover:bg-[var(--highlight)] ${
                    activeSection === item.id
                      ? "bg-[var(--highlight)] text-[var(--accent)]"
                      : "text-[var(--text-primary)]"
                  }`}
                >
                  <div className="flex items-center justify-center sm:justify-start w-full">
                    <span className={`${isCollapsed ? "mx-auto" : "mr-3"}`}>
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <span className="font-medium hidden sm:inline">
                        {item.label}
                      </span>
                    )}
                  </div>
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Collapse button at bottom */}
      <div className="mb-4 px-2 sm:px-3">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-full p-2 sm:p-3 rounded-md bg-[var(--highlight)] text-[var(--headlines)] hover:opacity-90 transition-colors duration-200"
        >
          {isCollapsed ? (
            <ChevronRight size={20} />
          ) : (
            <>
              <span className="mr-2 hidden sm:inline">Collapse</span>
              <ChevronLeft size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
