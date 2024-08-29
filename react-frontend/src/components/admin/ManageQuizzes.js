import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_QUIZZES, POST_QUIZZES, GET_STUDENT_ANSWERS } from "../../constants/apiConstants"; 

//import POST_QUIZZES from "../../constants/apiConstants";
const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    courseId: "",
    questions: [], // Assuming you're adding questions as an array
  });
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [studentResponses, setStudentResponses] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("https://your-api-endpoint-here.com/quizzes"); // Replace with your actual API endpoint
        setQuizzes(response.data);
      } catch (error) {
        setError("Error fetching quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleChange = (e) => {
    setNewQuiz({
      ...newQuiz,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(POST_QUIZZES, newQuiz); // Replace with your actual API endpoint
      setQuizzes([...quizzes, response.data]); // Add the new quiz to the list
      setNewQuiz({ title: "", courseId: "", questions: [] }); // Reset the form
    } catch (error) {
      setError("Error creating quiz");
    }
  };

  const handleQuizSelect = async (quizId) => {
    setSelectedQuizId(quizId);
    try {
      const response = await axios.get(`${GET_STUDENT_ANSWERS}/${quizId}`); // Replace with your actual API endpoint
      setStudentResponses(response.data);
    } catch (error) {
      setError("Error fetching student responses");
    }
  };

  if (loading) {
    return <div>Loading quizzes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Quizzes</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Quiz Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={newQuiz.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="courseId">
            Course ID
          </label>
          <input
            id="courseId"
            name="courseId"
            type="number"
            value={newQuiz.courseId}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Add inputs for questions here */}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Quiz
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="p-4 bg-gray-100 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{quiz.title}</h2>
            <button
              onClick={() => handleQuizSelect(quiz.id)}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              View Student Responses
            </button>
          </div>
        ))}
      </div>

      {selectedQuizId && studentResponses.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Student Responses</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200">Student Name</th>
                <th className="py-2 px-4 border-b-2 border-gray-200">Marks</th>
                <th className="py-2 px-4 border-b-2 border-gray-200">Submission Date</th>
              </tr>
            </thead>
            <tbody>
              {studentResponses.map((response) => (
                <tr key={response.studentId}>
                  <td className="py-2 px-4 border-b border-gray-200">{response.studentName}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{response.marks}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{new Date(response.submissionDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageQuizzes;
