import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProfile = ({ user, onClose, onUpdate }) => {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [categories, setCategories] = useState(
    (user.preferences?.categories || []).join(", ")
  );

  const handleUpdate = async () => {
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
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Update error:", error);
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="px-4 py-2 text-sm text-[var(--text-primary)]">
      <h5 className="text-xl text-center font-semibold mb-3 text-[var(--headlines)]">Update Profile</h5>
      <div className="mb-2">
        <label className="block text-xs">Name:</label>
        <input
          className="w-full p-1 rounded bg-transparent border border-[var(--dividers)] text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label className="block text-xs">Email:</label>
        <input
          className="w-full p-1 rounded bg-transparent border border-[var(--dividers)] text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label className="block text-xs">Preferences (comma-separated):</label>
        <input
          className="w-full p-1 rounded bg-transparent border border-[var(--dividers)] text-sm"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        />
      </div>

      <button
        onClick={handleUpdate}
        className="w-full text-left px-4 py-2 mt-2 text-[var(--accent)] hover:bg-[var(--highlight)]"
      >
        Update Information
      </button>
      <button
        onClick={onClose}
        className="w-full text-left px-4 py-2 text-[var(--accent)] hover:bg-[var(--highlight)]"
      >
        Cancel
      </button>
    </div>
  );
};

export default UpdateProfile;
