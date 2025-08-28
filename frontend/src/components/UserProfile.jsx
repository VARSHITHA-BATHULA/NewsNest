import { useState } from "react";
import UpdateProfile from "./UpdateProfile";

const UserProfile = ({ user, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="absolute right-0 mt-2 w-80 rounded-xl shadow-2xl bg-[var(--card-background)] ring-1 ring-[var(--dividers)] overflow-hidden backdrop-blur-sm animate-slideDown">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg border-2 border-white/30">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg">{user.name}</h3>
              <p className="text-white/80 text-sm">{user.email}</p>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-20 h-20 rounded-full bg-white/10"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/5"></div>
      </div>

      {isEditing ? (
        <UpdateProfile
          user={user}
          onClose={() => setIsEditing(false)}
          onUpdate={(updatedUser) => {
            onUpdate(updatedUser);
            setIsEditing(false);
          }}
        />
      ) : (
        <>
          {/* Content Section */}
          <div className="p-6">
            <div className="mb-4">
              <h4 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Preferences
              </h4>
              <div className="flex flex-wrap gap-2">
                {user.preferences?.categories?.map((category, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-black-300 rounded-full text-xs font-semibold border border-blue-200 dark:border-blue-700/50 capitalize"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-[var(--dividers)] bg-[var(--card-background)]/50">
            <button
              onClick={() => setIsEditing(true)}
              className="w-full flex items-center px-6 py-3 text-[var(--accent)] hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-200 group"
            >
              <svg className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className="font-medium">Update Profile</span>
            </button>
            <button
              onClick={onClose}
              className="w-full flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 group border-t border-[var(--dividers)]"
            >
              <svg className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="font-medium">Close</span>
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UserProfile;