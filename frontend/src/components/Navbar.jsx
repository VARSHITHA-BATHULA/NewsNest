// Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import AuthModal from "./AuthModal";
import UserProfile from "./UserProfile"; // Import the UserProfile component
import { User } from "lucide-react";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [uToken, setUToken] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const isDark =
      localStorage.getItem("darkMode") === "true" ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);

    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);

    const token = localStorage.getItem("UserToken");
    const storedUser = localStorage.getItem("UserData");

    if (token && storedUser) {
      setUToken(token);
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid user data in localStorage");
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("UserData", JSON.stringify(userData));
    localStorage.setItem("UserToken", "your-token");
    setUToken("your-token");
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("UserToken");
    localStorage.removeItem("UserData");
    setUser(null);
    setUToken(false);
    setIsDropdownOpen(false);
    toast.success("User logged out successfully");
  };

  const getInitials = (userName) => {
    if (!userName) return "NN";
    const parts = userName.trim().split(" ");
    return parts.map((p) => p[0].toUpperCase()).join("").slice(0, 2);
  };

  return (
    <nav className="bg-[var(--nav-bg)] z-20 shadow-md fixed top-0 left-0 right-0 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <svg
                className="h-8 w-8 text-[var(--headlines)]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 20H5V9H19M20 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V4C22 2.9 21.1 2 20 2M16 13H8V15H16V13M17 17H8V19H17V17M17 9H8V11H17V9Z" />
              </svg>
              <span className="ml-2 text-xl font-bold text-[var(--text-primary)]">
                NewsNest
              </span>
            </div>
          </div>

          {/* Right-side controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="text-[var(--secondary)] hover:text-[var(--text-primary)]"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Profile or initials */}
            <div className="relative ml-3" ref={dropdownRef}>
              <div>
                <button
                  type="button"
                  className="flex items-center text-sm rounded-full focus:outline-none"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-[var(--headlines)] flex items-center justify-center text-white">
                    {user && uToken ? (
                      <span>{getInitials(user.name)}</span>
                    ) : (
                      <User />
                    )}
                  </div>
                </button>
              </div>

              {isDropdownOpen && uToken && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[var(--card-background)] ring-1 ring-[var(--dividers)] py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--highlight)]"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--highlight)]"
                  >
                    Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-[var(--accent)] hover:bg-[var(--highlight)]"
                  >
                    Logout
                  </button>
                </div>
              )}

              {/* User Profile Display */}
              {isDropdownOpen && user && uToken && (
                <UserProfile user={user} onClose={() => setIsDropdownOpen(false)} />
              )}

            </div>

            {/* Create Account Button */}
            {!uToken ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full text-left px-2 py-2 text-[var(--secondary)] hover:text-[var(--text-primary)] focus:outline-none transition-colors duration-200 font-semibold cursor-pointer"
              >
                Create Account
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full text-left px-2 py-2 text-[var(--accent)] focus:outline-none transition-colors duration-200 font-semibold cursor-pointer"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AuthModal
          onClose={() => setIsModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </nav>
  );
};

export default Navbar;
