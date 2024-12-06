import React, { useState } from "react";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "@/config/firebaseConfig";

const Settings = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveChanges = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, password);

      setSuccessMessage("Password updated successfully!");
      setError("");
      setPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
    } catch (err) {
      setError(err.message || "Failed to update password. Please try again.");
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (
    label,
    value,
    setValue,
    visible,
    setVisible,
    placeholder
  ) => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-1">
        {label}
      </label>
      <div className="relative w-1/3">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute inset-y-0 right-2 flex items-center text-gray-500"
        >
          {visible ? "👁" : "🙈"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto py-12 px-6 bg-slate-100">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white  shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        {renderInput(
          "Current Password",
          currentPassword,
          setCurrentPassword,
          currentPasswordVisible,
          setCurrentPasswordVisible,
          "Enter current password"
        )}
        {renderInput(
          "New Password",
          password,
          setPassword,
          passwordVisible,
          setPasswordVisible,
          "Enter new password"
        )}
        {renderInput(
          "Confirm New Password",
          confirmPassword,
          setConfirmPassword,
          confirmPasswordVisible,
          setConfirmPasswordVisible,
          "Confirm new password"
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        <button
          onClick={handleSaveChanges}
          className={`px-4 py-2 rounded text-white ${
            isLoading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
