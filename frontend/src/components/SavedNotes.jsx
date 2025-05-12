import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Edit, Trash } from "lucide-react";

const SavedNotes = () => {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteTags, setNoteTags] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/notes", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("UserToken")}`
        }
      });
      setNotes(response.data.notes);
    } catch (error) {
      toast.error("Failed to fetch notes");
    }
  };

  const saveNote = async () => {
    if (!noteTitle || !noteContent) {
      toast.error("Title and content are required");
      return;
    }

    try {
      if (editingNoteId) {
        await axios.put(`http://localhost:5000/api/notes/${editingNoteId}`, {
          title: noteTitle,
          content: noteContent,
          tags: noteTags.split(",").map(tag => tag.trim()),
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("UserToken")}`
          }
        });

        toast.success("Note updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/notes", {
          title: noteTitle,
          content: noteContent,
          tags: noteTags.split(",").map(tag => tag.trim()),
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("UserToken")}`
          }
        });

        toast.success("Note saved successfully");
      }

      resetForm();
      fetchNotes();
    } catch (error) {
      toast.error("Failed to save note");
    }
  };

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
            'Authorization': `Bearer ${localStorage.getItem("UserToken")}`
          }
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
    <div className="w-[1100px] mt-6 mr-15 ml-22 p-6 bg-[var(--card-background)] rounded-lg shadow">
      <h2 className="text-3xl text-center font-semibold mb-7 text-[var(--headlines)]">Saved Notes</h2>
      <input
        type="text"
        className="w-full p-3 mb-5 border border-[var(--dividers)] rounded-md bg-[var(--input-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--headlines)] text-[var(--text-primary)]"
        placeholder="Note Title"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
      />
      <textarea
        className="w-full p-3 mb-3 border border-[var(--dividers)] rounded-md bg-[var(--input-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--headlines)] text-[var(--text-primary)]"
        placeholder="Add your notes here..."
        rows={5}
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      ></textarea>
      <input
        type="text"
        className="w-full p-3 mb-3 border border-[var(--dividers)] rounded-md bg-[var(--input-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--headlines)] text-[var(--text-primary)]"
        placeholder="Tags (comma separated)"
        value={noteTags}
        onChange={(e) => setNoteTags(e.target.value)}
      />
      <button
        className="mt-3 px-4 py-2 bg-[var(--accent)] text-white rounded-md hover:opacity-90 transition block mx-auto"
        onClick={saveNote}
      >
        {editingNoteId ? "Update Note" : "Save Note"}
      </button>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-center">Your Notes</h3>
        <ul>
          {notes.map(note => (
            <li key={note._id} className="border-b border-[var(--dividers)] pb-2 mb-2 flex justify-between items-center">
              <div>
                <h4 className="text-xl font-medium">{note.title}</h4>
                <p>{note.content}</p>
                <p className="text-sm text-[var(--secondary)]">Tags: {note.tags.join(", ")}</p>
              </div>
              <div className="flex space-x-3">
                <button onClick={() => editNote(note)} className="text-blue-500 hover:underline">
                  <Edit size={16} />
                </button>
                <button onClick={() => deleteNote(note._id)} className="text-red-500 hover:underline">
                  <Trash size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SavedNotes;
