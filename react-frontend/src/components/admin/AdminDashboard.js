import React, { useState } from "react";

import ManageAssignments from "./ManageAssignments";
import ManageQuizzes from "./ManageQuizzes";
import ManageNotes from "./ManageNotes";
import ManageUserDetails from "./ManageUserDetails";
import AdminProfile from "./AdminProfile";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("assignments"); 

  // Render the active component based on the state
  const renderComponent = () => {
    switch (activeComponent) {
      case "assignments":
        return <ManageAssignments />;
      case "quizzes":
        return <ManageQuizzes/>
      case "notes":
        return <ManageNotes />;
      case "userDetails":
        return <ManageUserDetails />;
      case "profile":
        return <AdminProfile />;
      
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-16 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Welcome, Admin!
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-8">
          Manage assignments, quizzes, notes, users, and keep your profile up to date.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setActiveComponent("assignments")}
          className="block p-6 bg-[#28425A] text-white rounded-lg hover:bg-[#9CBAC0] transition duration-300"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Manage Assignments</h2>
          <p className="text-sm sm:text-base">
            Create, edit, or delete assignments for all teachers and students.
          </p>
        </button>

        <button
          onClick={() => setActiveComponent("quizzes")}
          className="block p-6 bg-[#28425A] text-white rounded-lg hover:bg-[#9CBAC0] transition duration-300"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Manage Quizzes</h2>
          <p className="text-sm sm:text-base">
            Create, edit, or delete quizzes for all teachers and students.
          </p>
        </button>

        <button
          onClick={() => setActiveComponent("notes")}
          className="block p-6 bg-[#28425A] text-white rounded-lg hover:bg-[#9CBAC0] transition duration-300"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Manage Notes</h2>
          <p className="text-sm sm:text-base">
            Create, edit, or delete notes for all teachers and students.
          </p>
        </button>

        <button
          onClick={() => setActiveComponent("userDetails")}
          className="block p-6 bg-[#28425A] text-white rounded-lg hover:bg-[#9CBAC0] transition duration-300"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Manage User Details</h2>
          <p className="text-sm sm:text-base">
            View, add, or modify user details and permissions.
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

      <div className="mt-12">{renderComponent()}</div>
    </div>
  );
};

export default AdminDashboard;
