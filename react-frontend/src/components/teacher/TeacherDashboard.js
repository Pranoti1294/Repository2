import React, { useState } from "react";



import ManagerTeacherProfile from "./ManagerTeacherProfile";
import CrudNotes from "./CrudNotes";
import CrudQuiz from "./CrudQuiz";
import CrudAssignments from "./CrudAssignment";

const TeacherDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("notes"); // Default component

  // Render the active component based on the state
  const renderComponent = () => {
    switch (activeComponent) {
      case "notes":
        return <CrudNotes />;
      case "assignments":
        return <CrudAssignments />;
      case "quiz":
        return <CrudQuiz />;
      case "profile":
        return <ManagerTeacherProfile />;
      default:
        return <CrudNotes />;
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-16 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Welcome, Teacher!
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-8">
          Manage your resources and tasks, and keep your profile up to date.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setActiveComponent("notes")}
          className="block p-6 bg-[#28425A] text-white rounded-lg hover:bg-[#9CBAC0] transition duration-300"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Manage Notes</h2>
          <p className="text-sm sm:text-base">
            Create, edit, or delete notes for your students.
          </p>
        </button>

        <button
          onClick={() => setActiveComponent("quiz")}
          className="block p-6 bg-[#28425A] text-white rounded-lg hover:bg-[#9CBAC0] transition duration-300"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Manage Quizzes</h2>
          <p className="text-sm sm:text-base">
            Create, edit, or delete quizzes for your students.
          </p>
        </button>

        <button
          onClick={() => setActiveComponent("assignments")}
          className="block p-6 bg-[#28425A] text-white rounded-lg hover:bg-[#9CBAC0] transition duration-300"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Manage Assignments</h2>
          <p className="text-sm sm:text-base">
            Create, edit, or delete assignments for your students.
          </p>
        </button>

        <button
          onClick={() => setActiveComponent("profile")}
          className="block p-6 bg-[#28425A] text-white rounded-lg hover:bg-[#9CBAC0] transition duration-300"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Profile</h2>
          <p className="text-sm sm:text-base">
            Update your profile and personal information.
          </p>
        </button>
      </div>

      <div className="mt-12">
        {renderComponent()}
      </div>
    </div>
  );
};

export default TeacherDashboard;
