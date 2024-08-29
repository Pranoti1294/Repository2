import React, { useState, useEffect } from "react";
import axios from "axios";

const CrudAssignments = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null); // For teacher's assignment file
  const [submissionFile, setSubmissionFile] = useState(null); // For student's submission
  const [teacherId, setTeacherId] = useState(""); // Should come from context/session
  const [studentId, setStudentId] = useState(""); // For assigning to a specific student
  const [courseId, setCourseId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [assignments, setAssignments] = useState([]); // To store assignments for review

  useEffect(() => {
    // Fetch assignments for the teacher to review
    const fetchAssignments = async () => {
      try {
        const response = await axios.get("https://api.example.com/assignments/teacher/" + teacherId);
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, [teacherId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmissionFileChange = (e) => {
    setSubmissionFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !file || !teacherId || !studentId || !courseId || !dueDate) {
      setError("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("teacherId", teacherId);
    formData.append("studentId", studentId);
    formData.append("courseId", courseId);
    formData.append("dueDate", dueDate);

    try {
      const response = await axios.post("https://api.example.com/assignments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Assignment added successfully!");
      setError(null);
      setTitle("");
      setDescription("");
      setFile(null);
      setTeacherId("");
      setStudentId("");
      setCourseId("");
      setDueDate("");
    } catch (error) {
      setError("Failed to add assignment. Please try again.");
    }
  };

  const handleSubmission = async (assignmentId) => {
    if (!submissionFile) {
      setError("Please select a file to submit.");
      return;
    }

    const formData = new FormData();
    formData.append("submissionFile", submissionFile);

    try {
      const response = await axios.post(`https://api.example.com/assignments/${assignmentId}/submit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Assignment submitted successfully!");
      setError(null);
      setSubmissionFile(null);
      // Reload assignments
      const updatedAssignments = await axios.get("https://api.example.com/assignments/teacher/" + teacherId);
      setAssignments(updatedAssignments.data);
    } catch (error) {
      setError("Failed to submit assignment. Please try again.");
    }
  };

  const handleGrade = async (assignmentId, grade) => {
    try {
      const response = await axios.post(`https://api.example.com/assignments/${assignmentId}/grade`, { grade });

      setSuccessMessage("Assignment graded successfully!");
      setError(null);
      // Reload assignments
      const updatedAssignments = await axios.get("https://api.example.com/assignments/teacher/" + teacherId);
      setAssignments(updatedAssignments.data);
    } catch (error) {
      setError("Failed to grade assignment. Please try again.");
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Assignments</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Assignment Title:
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
          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="file">
            Upload Assignment File:
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

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="dueDate">
            Due Date:
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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
          Add Assignment
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Assignments for Review</h2>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.id} className="mb-4">
            <h3 className="font-bold">{assignment.title}</h3>
            <p>{assignment.description}</p>
            <p><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>
            {assignment.submissionFilePath && (
              <div>
                <a href={assignment.submissionFilePath} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  View Submission
                </a>
                {!assignment.isGraded && (
                  <div className="mt-2">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor={`grade-${assignment.id}`}>
                      Grade:
                    </label>
                    <input
                      id={`grade-${assignment.id}`}
                      type="text"
                      onChange={(e) => handleGrade(assignment.id, e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                )}
                {assignment.isGraded && <p><strong>Grade:</strong> {assignment.grade}</p>}
              </div>
            )}
            {!assignment.submissionFilePath && (
              <div className="mt-4">
                <input
                  type="file"
                  onChange={handleSubmissionFileChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                  onClick={() => handleSubmission(assignment.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 focus:outline-none focus:shadow-outline"
                >
                  Submit Assignment
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudAssignments;
