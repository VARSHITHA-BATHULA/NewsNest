import React from "react";

const UserProfile = ({ user, onClose }) => {
  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[var(--card-background)] ring-1 ring-[var(--dividers)] py-2">
      <div className="px-4 py-2 text-sm text-[var(--text-primary)]">
        <h3 className="font-semibold">{user.name}</h3>
        <p className="text-xs">{user.email}</p>
        <div className="mt-2">
          <h4 className="font-medium">Preferences:</h4>
          <ul className="list-disc list-inside text-xs">
            {user.preferences.categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>
      </div>
      <button
        onClick={onClose}
        className="w-full text-left px-4 py-2 text-[var(--accent)] hover:bg-[var(--highlight)]"
      >
        Close
      </button>
    </div>
  );
};

export default UserProfile;
