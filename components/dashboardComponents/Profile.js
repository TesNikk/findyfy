import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebaseConfig"; // Ensure you have these configured properly
import { useAuthState } from "react-firebase-hooks/auth";

const Profile = () => {
  const [user] = useAuthState(auth); // Get the logged-in user
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    phone: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return; // Wait for user to be authenticated
      const userRef = doc(db, "users", user.uid); // Reference to Firestore document
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        setProfileData(docSnap.data()); // Populate data from Firestore
      } else {
        console.log("No user data found");
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Save changes to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return; // Ensure the user is logged in
    const userRef = doc(db, "users", user.uid);

    try {
      await setDoc(userRef, profileData, { merge: true }); // Save data to Firestore
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="container mx-auto py-12 px-6 bg-slate-100">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your username"
              value={profileData.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your email"
              value={profileData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your phone number"
              value={profileData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bio"
            >
              Bio
            </label>
            <textarea
              id="bio"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Tell us something about you"
              value={profileData.bio}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
