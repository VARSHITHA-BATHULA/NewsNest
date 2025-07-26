// AuthModal.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ onClose, onLoginSuccess }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    preferences: {
      sources: "timesofindia",
      categories: ["politics", "business", "technology", "sports"],
    },
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "preferences") {
      setFormData((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          sources: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
    try {
      if (isSignup) {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
          formData
        );
        toast.success(response.data.message);
        // <Route path="/home" element={<App />} />;
        // Store token, userId, and name in localStorage
        localStorage.setItem("UserToken", response.data.token);
        localStorage.setItem("UserId", response.data.user._id);
        localStorage.setItem("UserName", response.data.user.name);
        onLoginSuccess(response.data.user);
        onClose();
        navigate('/');
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
          {
            email: formData.email,
            password: formData.password,
          }
        );
        toast.success(response.data.message);
        // Store token, userId, and name in localStorage
        localStorage.setItem("UserToken", response.data.token);
        localStorage.setItem("UserId", response.data.user._id); // Assuming user object has _id
        localStorage.setItem("UserName", response.data.user.name);
        onLoginSuccess(response.data.user);
        onClose();
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[var(--card-background)] p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-[400px] sm:max-w-[460px] mx-4">
        <h2 className="text-2xl sm:text-3xl mb-5 text-center font-semibold text-[var(--headlines)]">
          {isSignup ? "Sign Up" : "Log In"}
        </h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="mb-4">
              <label
                className="block mb-1 text-sm text-[var(--text-primary)]"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-[var(--dividers)] rounded-md bg-[var(--input-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--headlines)] text-sm"
              />
            </div>
          )}
          <div className="mb-4">
            <label
              className="block mb-1 text-sm text-[var(--text-primary)]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-[var(--dividers)] rounded-md bg-[var(--input-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--headlines)] text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-1 text-sm text-[var(--text-primary)]"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-[var(--dividers)] rounded-md bg-[var(--input-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--headlines)] text-sm"
            />
          </div>
          {isSignup && (
            <div className="mb-4">
              <label
                className="block mb-1 text-sm text-[var(--text-primary)]"
                htmlFor="preferences"
              >
                Preferred News Source
              </label>
              <select
                id="preferences"
                name="preferences"
                value={formData.preferences.sources}
                onChange={handleChange}
                className="w-full p-2 border border-[var(--dividers)] rounded-md bg-[var(--input-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--headlines)] text-sm"
              >
                <option value="timesofindia">Times of India</option>
                <option value="hindu">The Hindu</option>
                <option value="bbc">BBC</option>
                <option value="guardian">The Guardian</option>
                <option value="reuters">Reuters</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            className="bg-[var(--accent)] text-white rounded-md px-4 py-2 block mx-auto mt-4 hover:opacity-90 transition-all duration-200 text-sm font-medium"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[var(--text-primary)]">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-[var(--accent)] hover:underline"
          >
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>
        <button
          onClick={onClose}
          className="mt-4 text-red-500 block mx-auto text-sm hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
