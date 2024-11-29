import React, { useState, useRef } from "react";
import { auth, db } from "@/config/firebaseConfig"; // Ensure Firebase is configured
import { doc, collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const LostItem = () => {
  const [user] = useAuthState(auth); // Get logged-in user
  const [lostItem, setLostItem] = useState({
    subject: "",
    description: "",
    location: "",
    date: "",
    mobile: "",
    photo: null,
  });
  const [isUploading, setIsUploading] = useState(false); // Track upload status
  const fileInputRef = useRef(null);
  // Function to upload the image to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    ); // Preset from Cloudinary
    formData.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    ); // Your Cloudinary cloud name

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url; // Secure URL of the uploaded image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to submit a lost item.");
      return;
    }

    if (!lostItem.subject) {
      alert("Subject name cannot be empty!");
      return;
    }

    setIsUploading(true); // Start upload process
    try {
      let photoURL = null;

      if (lostItem.photo) {
        // Upload photo to Cloudinary and get the URL
        photoURL = await uploadToCloudinary(lostItem.photo);
      }

      const userRef = doc(db, "users", user.uid); // Reference to the user's document
      const lostItemsRef = collection(userRef, "lostItems"); // Subcollection reference

      // Add the lost item to the Firestore subcollection
      await addDoc(lostItemsRef, {
        ...lostItem,
        photo: photoURL, // Save Cloudinary URL in Firestore
        timestamp: new Date(), // Add a timestamp for sorting
      });

      alert("Lost item reported successfully!");
      // Clear the form
      setLostItem({
        subject: "",
        description: "",
        location: "",
        date: "",
        mobile: "",
        photo: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error reporting lost item:", error);
      alert("Failed to report the lost item. Please try again.");
    } finally {
      setIsUploading(false); // End upload process
    }
  };

  return (
    <div className="bg-red-100 flex py-3">
      <div className="bg-red-200 p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Report Lost Item
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Subject Name</label>
            <input
              type="text"
              value={lostItem.subject}
              onChange={(e) =>
                setLostItem({ ...lostItem, subject: e.target.value })
              }
              className="w-full p-2 mt-1 border rounded-md text-sm"
              placeholder="Item name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Description</label>
            <textarea
              value={lostItem.description}
              onChange={(e) =>
                setLostItem({ ...lostItem, description: e.target.value })
              }
              className="w-full p-2 mt-1 border rounded-md text-sm"
              placeholder="Item description"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Location</label>
            <input
              type="text"
              value={lostItem.location}
              onChange={(e) =>
                setLostItem({ ...lostItem, location: e.target.value })
              }
              className="w-full p-2 mt-1 border rounded-md text-sm"
              placeholder="Location"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Date & Time</label>
            <input
              type="datetime-local"
              value={lostItem.date}
              onChange={(e) =>
                setLostItem({ ...lostItem, date: e.target.value })
              }
              className="w-full p-2 mt-1 border rounded-md text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Mobile Number</label>
            <input
              type="tel"
              pattern="[0-9]{11}"
              value={lostItem.mobile}
              onChange={(e) =>
                setLostItem({ ...lostItem, mobile: e.target.value })
              }
              className="w-full p-2 mt-1 border rounded-md text-sm"
              placeholder="Mobile"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Add Photo</label>
            <input
              type="file"
              //accept="image/*"
              ref={fileInputRef}
              onChange={(e) =>
                setLostItem({ ...lostItem, photo: e.target.files[0] })
              }
              className="w-full p-2 mt-1 border rounded-md text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-md font-medium hover:bg-red-600 transition duration-300"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LostItem;
