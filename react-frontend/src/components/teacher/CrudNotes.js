import React, { useState, useEffect } from "react";
import axios from "axios";

const CrudNotes = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState(""); // This would typically come from context or user session
  const [courseId, setCourseId] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [notes, setNotes] = useState([]); // State to hold the submitted notes

  useEffect(() => {
    // Fetch the submitted notes when the component loads
    const fetchNotes = async () => {
      try {
        const response = await axios.get("https://api.example.com/notes", {
          params: { userId, courseId },
        });
        setNotes(response.data);
      } catch (error) {
        setError("Failed to fetch notes. Please try again.");
      }
    };

    fetchNotes();
  }, [userId, courseId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !file || !userId || !courseId) {
      setError("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("courseId", courseId);

    try {
      const response = await axios.post("https://api.example.com/notes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Note added successfully!");
      setError(null);
      setTitle("");
      setFile(null);
      setUserId("");
      setCourseId("");

      // Refresh the notes list after adding a new note
      setNotes([...notes, response.data]);

    } catch (error) {
      setError("Failed to add note. Please try again.");
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Add a New Note</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Note Title:
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="file">
            Upload File:
          </label>
          <input
            id="file"
            name="file"
            type="file"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Note
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Submitted Notes</h2>
      {notes.length > 0 ? (
        <ul>
          {notes.map((note) => (
            <li key={note.id} className="mb-2">
              <span className="font-semibold">{note.title}</span>
              <a href={note.filePath} download className="ml-4 text-blue-500 hover:underline">
                Download
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes submitted yet.</p>
      )}
    </div>
  );
};

export default CrudNotes;
