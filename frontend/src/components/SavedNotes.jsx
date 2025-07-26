// SavedNotes.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Edit, Trash } from "lucide-react";

const SavedNotes = () => {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteTags, setNoteTags] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem("UserToken");
    console.log("Token on component mount:", token);
    console.log("Token exists:", !!token);
    if (token) {
      console.log("Token preview:", `${token.substring(0, 20)}...`);
    }
  }, []);

  // const fetchNotes = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/api/notes", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
  //       },
  //     });
  //     setNotes(response.data.notes);
  //   } catch (error) {
  //     toast.error("Failed to fetch notes");
  //   }
  // };
  const fetchNotes = async () => {
  const token = localStorage.getItem("UserToken");
  console.log("Fetching notes with token:", !!token);
  
  try {
    const response = await axios.get("http://localhost:5000/api/notes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log("Fetch notes response:", response.data);
    setNotes(response.data.notes);
  } catch (error) {
    console.error("Fetch notes error:", error);
    console.error("Error response:", error.response);
    
    if (error.response?.status === 401) {
      toast.error("Please log in again");
      // Optionally redirect to login
    } else {
      toast.error("Failed to fetch notes");
    }
  }
};

  const saveNote = async () => {
    if (!noteTitle || !noteContent) {
      toast.error("Title and content are required");
      return;
    }
    // Debug: Check token exists
  const token = localStorage.getItem("UserToken");
  console.log("Token exists:", !!token);
  console.log("Token preview:", token ? `${token.substring(0, 20)}...` : "No token");

  // Debug: Check data being sent
  const noteData = {
    title: noteTitle,
    content: noteContent,
    tags: noteTags.split(",").map((tag) => tag.trim()).filter(tag => tag.length > 0),
  };
  console.log("Sending note data:", noteData);
  try {
    let response;
    
    if (editingNoteId) {
      console.log("Updating note with ID:", editingNoteId);
      response = await axios.put(
        `http://localhost:5000/api/notes/${editingNoteId}`,
        noteData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Note updated successfully");
    } else {
      console.log("Creating new note");
      response = await axios.post(
        "http://localhost:5000/api/notes",
        noteData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Note saved successfully");
    }

    console.log("Success response:", response.data);
    resetForm();
    fetchNotes();
  } catch (error) {
    console.error("Full error object:", error);
    console.error("Error response:", error.response);
    console.error("Error message:", error.message);
    
    if (error.response) {
      // Server responded with error status
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      
      const errorMessage = error.response.data?.message || "Failed to save note";
      toast.error(`Error: ${errorMessage}`);
    } else if (error.request) {
      // Network error
      console.error("Network error - no response received");
      toast.error("Network error. Please check your connection.");
    } else {
      // Something else happened
      toast.error("An unexpected error occurred");
    }
  }
};

  //   try {
  //     if (editingNoteId) {
  //       await axios.put(
  //         `http://localhost:5000/api/notes/${editingNoteId}`,
  //         {
  //           title: noteTitle,
  //           content: noteContent,
  //           tags: noteTags.split(",").map((tag) => tag.trim()),
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
  //           },
  //         }
  //       );

  //       toast.success("Note updated successfully");
  //     } else {
  //       await axios.post(
  //         "http://localhost:5000/api/notes",
  //         {
  //           title: noteTitle,
  //           content: noteContent,
  //           tags: noteTags.split(",").map((tag) => tag.trim()),
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
  //           },
  //         }
  //       );

  //       toast.success("Note saved successfully");
  //     }

  //     resetForm();
  //     fetchNotes();
  //   } catch (error) {
  //     toast.error("Failed to save note");
  //   }
  // };

  const resetForm = () => {
    setNoteTitle("");
    setNoteContent("");
    setNoteTags("");
    setEditingNoteId(null);
  };

  const editNote = (note) => {
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteTags(note.tags.join(", "));
    setEditingNoteId(note._id);
  };

  const deleteNote = async (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await axios.delete(`http://localhost:5000/api/notes/${noteId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
          },
        });
        toast.success("Note deleted successfully");
        fetchNotes();
      } catch (error) {
        toast.error("Failed to delete note");
      }
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="w-full max-w-[1000px] mt-6 mx-auto p-4 sm:p-6 bg-[var(--card-background)] rounded-lg shadow ml-20 sm:ml-20 lg:ml-72 mr-4 sm:mr-8 min-h-[calc(100vh-12rem)]">
      <h2 className="text-xl sm:text-2xl md:text-3xl text-center font-semibold mb-6 text-[var(--headlines)]">
        Saved Notes
      </h2>

      {/* Note Creation Form */}
      <div
        className="mb-6 p-3 sm:p-5 rounded-lg shadow"
        style={{ backgroundColor: "var(--highlight)" }}
      >
        <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 text-[var(--headlines)]">
          {editingNoteId ? "Edit Note" : "Create a New Note"}
        </h3>
        <input
          type="text"
          className="w-full p-2 sm:p-3 mb-3 border border-[var(--dividers)] rounded-md bg-[var(--input-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--headlines)] text-[var(--text-primary)] text-xs sm:text-sm md:text-base"
          placeholder="Note Title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 sm:p-3 mb-3 border border-[var(--dividers)] rounded-md bg-[var(--input-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--headlines)] text-[var(--text-primary)] text-xs sm:text-sm md:text-base"
          placeholder="Add your notes here..."
          rows={3}
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        ></textarea>
        <input
          type="text"
          className="w-full p-2 sm:p-3 mb-3 border border-[var(--dividers)] rounded-md bg-[var(--input-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--headlines)] text-[var(--text-primary)] text-xs sm:text-sm md:text-base"
          placeholder="Tags (comma separated)"
          value={noteTags}
          onChange={(e) => setNoteTags(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-[var(--accent)] text-white rounded-md hover:opacity-90 transition text-xs sm:text-sm md:text-base font-medium"
            onClick={saveNote}
          >
            {editingNoteId ? "Update Note" : "Save Note"}
          </button>
          {editingNoteId && (
            <button
              className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-500 text-white rounded-md hover:opacity-90 transition text-xs sm:text-sm md:text-base font-medium"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Notes List */}
      <div>
        <h3 className="text-base sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-center text-[var(--headlines)]">
          Your Notes
        </h3>
        {notes.length > 0 ? (
          <ul className="space-y-3 sm:space-y-4">
            {notes.map((note) => (
              <li
                key={note._id}
                className="p-3 sm:p-4 rounded-md border border-[var(--dividers)] bg-[var(--card-background)] shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3"
              >
                <div className="flex-1">
                  <h4 className="text-base sm:text-lg md:text-xl font-medium text-[var(--headlines)] mb-1 sm:mb-2">
                    {note.title}
                  </h4>
                  <p className="text-xs sm:text-sm md:text-base text-[var(--text-primary)] mb-1 sm:mb-2">
                    {note.content}
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--secondary)]">
                    Tags: {note.tags.join(", ")}
                  </p>
                </div>
                <div className="flex space-x-2 sm:space-x-3">
                  <button
                    onClick={() => editNote(note)}
                    className="p-1 sm:p-2 rounded-md hover:bg-[var(--highlight)] transition"
                    title="Edit Note"
                  >
                    <Edit size={14} sm:size={16} className="text-blue-500" />
                  </button>
                  <button
                    onClick={() => deleteNote(note._id)}
                    className="p-1 sm:p-2 rounded-md hover:bg-[var(--highlight)] transition"
                    title="Delete Note"
                  >
                    <Trash size={14} sm:size={16} className="text-red-500" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-6 sm:py-8">
            <div
              className="w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3"
              style={{ backgroundColor: "var(--highlight)" }}
            >
              <svg
                className="w-5 sm:w-6 h-5 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: "var(--secondary)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-[var(--text-primary)]">
              No notes available. Create a new note to get started!
            </p>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SavedNotes;
