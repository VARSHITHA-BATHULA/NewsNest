import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
    try {
      if (isSignup) {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, formData);
        toast.success(response.data.message);
        localStorage.setItem("UserToken", response.data.token);
        onLoginSuccess(response.data.user);
        onClose();
      } else {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
          email: formData.email,
          password: formData.password,
        });
        toast.success(response.data.message);
        localStorage.setItem("UserToken", response.data.token);
        onLoginSuccess(response.data.user);
        onClose();
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-[460px] sm:w-[500px]">
        <h2 className="text-3xl mb-5 text-center">{isSignup ? "Sign Up" : "Log In"}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="mb-4">
              <label className="block mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border rounded w-full p-2"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>
          {isSignup && (
            <div className="mb-4">
              <label className="block mb-1" htmlFor="preferences">
                Preferred News Source
              </label>
              <select
                id="preferences"
                name="preferences"
                value={formData.preferences.sources}
                onChange={handleChange}
                className="border rounded w-full p-2"
              >
                <option value="timesofindia">Times of India</option>
                <option value="hindu">Hindu</option>
                <option value="bbc">BBC</option>
                <option value="guardian">Guardian</option>
                <option value="reuters">Reuters</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 block mx-auto mt-2"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-500"
          >
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>
        <button onClick={onClose} className="mt-4 text-red-500 block mx-auto">
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
