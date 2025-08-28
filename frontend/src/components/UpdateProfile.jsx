import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProfile = ({ user, onClose, onUpdate }) => {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [categories, setCategories] = useState(
    (user.preferences?.categories || []).join(", ")
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("UserToken");
      if (!token) {
        alert("Authentication token not found. Please log in again.");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const profileResponse = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
        { name, email },
        config
      );

      const categoryArray = categories
        .split(",")
        .map((cat) => cat.trim())
        .filter((cat) => cat);

      const preferencesResponse = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/preferences`,
        {
          preferences: { categories: categoryArray },
        },
        config
      );

      const updatedUser = {
        ...profileResponse.data.user,
        preferences: preferencesResponse.data.user?.preferences || {
          categories: categoryArray,
        },
      };

      onUpdate(updatedUser);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h5 className="text-xl font-bold text-[var(--headlines)] mb-1">Update Profile</h5>
        <p className="text-sm text-[var(--text-secondary)]">Modify your personal information</p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Name Field */}
        <div className="group">
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Name
          </label>
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-[var(--card-background)] border-2 border-[var(--dividers)] text-[var(--text-primary)] text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 group-hover:border-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        {/* Email Field */}
        <div className="group">
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email
          </label>
          <input
            type="email"
            className="w-full p-3 rounded-lg bg-[var(--card-background)] border-2 border-[var(--dividers)] text-[var(--text-primary)] text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 group-hover:border-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        {/* Preferences Field */}
        <div className="group">
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Preferences
          </label>
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-[var(--card-background)] border-2 border-[var(--dividers)] text-[var(--text-primary)] text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 group-hover:border-green-400"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            placeholder="politics, business, technology, sports"
          />
          <p className="text-xs text-[var(--text-secondary)] mt-1">Separate multiple preferences with commas</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-3 mt-6 pt-4 border-t border-[var(--dividers)]">
        <button
          onClick={handleUpdate}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Update Information
            </>
          )}
        </button>
        
        <button
          onClick={onClose}
          className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-[var(--text-primary)] font-medium rounded-lg transition-all duration-200 border border-[var(--dividers)]"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancel
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UpdateProfile;