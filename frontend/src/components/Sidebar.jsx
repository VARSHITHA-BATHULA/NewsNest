// Sidebar.jsx
import { Link } from "react-router-dom";
import {
  Newspaper,
  BookmarkCheck,
  NotepadText,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const Sidebar = ({ activeSection, setActiveSection, isCollapsed, setIsCollapsed }) => {
  const menuItems = [
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
      className={`h-screen sticky top-16 pt-4 bg-[var(--card-background)] border-r border-divider transition-all duration-300 z-10 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="h-full flex flex-col justify-between">
        <div className="mt-6">
          <ul className="space-y-2 px-3">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link to={item.path}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center w-full p-3 rounded-md transition-colors duration-200 hover:bg-highlight ${
                      activeSection === item.id
                        ? "bg-highlight text-accent"
                        : "text-[var(--text-primary)]"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{item.icon}</span>
                      {!isCollapsed && <span className="font-medium">{item.label}</span>}
                    </div>
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8 px-3">
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-full p-2 rounded-md bg-highlight text-headlines hover:opacity-90 transition-colors duration-200"
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <>
                <span className="mr-2">Collapse</span>
                <ChevronLeft size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
