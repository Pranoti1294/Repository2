import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { changePassword } from "../../services/userServices";

const ManagerTeacherProfile = () => {
  // const { user } = useSelector((state) => state.auth);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const changePassword = null; // Replace with actual changePassword function
  const user = {}; // Replace with actual user data from useSelector

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }
    try {
      await changePassword(user.userId, currentPassword, newPassword);
      setSuccessMessage("Password changed successfully!");
      setPasswordError(null);
    } catch (error) {
      setPasswordError("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Profile</h2>
      <div className="mb-4 md:mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-1">
          First Name:
        </label>
        <p>{user.firstName}</p>
      </div>
      <div className="mb-4 md:mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-1">
          Last Name:
        </label>
        <p>{user.lastName}</p>
      </div>
      <div className="mb-4 md:mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-1">
          Email:
        </label>
        <p>{user.email}</p>
      </div>
      <div className="mb-4 md:mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-1">
          Course:
        </label>
        <p>{user.courseName}</p>
      </div>

      {/* Change Password Section */}
      <h3 className="text-lg md:text-xl font-semibold mb-4 mt-6">Change Password</h3>
      <form onSubmit={handlePasswordChange}>
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Current Password:
          </label>
          <input
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <FontAwesomeIcon
              icon={showCurrentPassword ? faEyeSlash : faEye}
              className="text-gray-500 h-6 mt-6"
            />
          </button>
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            New Password:
          </label>
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <FontAwesomeIcon
              icon={showNewPassword ? faEyeSlash : faEye}
              className="text-gray-500 h-6 mt-6"
            />
          </button>
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Confirm New Password:
          </label>
          <input
            type={showConfirmNewPassword ? "text" : "password"}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <FontAwesomeIcon
              icon={showConfirmNewPassword ? faEyeSlash : faEye}
              className="text-gray-500 h-6 mt-6"
            />
          </button>
        </div>

        {passwordError && <p className="text-red-500 mb-4">{passwordError}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <div className="text-center">
          <button
            type="submit"
            className="w-fit text-white bg-[#28425a] px-4 py-2 rounded-md hover:bg-white hover:text-[#28425a] hover:border-[#1e3a8a] border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e3a8a] transition-transform transform hover:scale-105"
          >
            Change Password
          </button></div>
      </form>
    </div>
  );
};

export default ManagerTeacherProfile;