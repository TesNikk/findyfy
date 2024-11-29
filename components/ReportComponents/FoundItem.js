import React, { useState, useRef } from "react";
import { auth, db } from "@/config/firebaseConfig"; // Firebase configuration file
import { doc, collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const FoundItem = () => {
  const [user] = useAuthState(auth); // Get logged-in user
  const [foundItem, setFoundItem] = useState({
    subject: "",
    description: "",
    date: "",
    mobile: "",
    photo: null,
    location: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  // Function to upload the image to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    ); // Cloudinary upload preset
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

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to report a found item.");
      return;
    }

    if (!foundItem.subject) {
      alert("Subject name cannot be empty!");
      return;
    }

    setIsUploading(true); // Start upload process
    try {
      let photoURL = null;

      if (foundItem.photo) {
        // Upload photo to Cloudinary
        photoURL = await uploadToCloudinary(foundItem.photo);
      }

      const userRef = doc(db, "users", user.uid); // Reference to the user's document
      const foundItemsRef = collection(userRef, "foundItems"); // Subcollection for found items

      // Add the found item to the Firestore subcollection
      await addDoc(foundItemsRef, {
        ...foundItem,
        photo: photoURL, // Save the Cloudinary image URL
        timestamp: new Date(), // Add a timestamp
      });

      alert("Found item reported successfully!");
      // Clear the form
      setFoundItem({
        subject: "",
        description: "",
        date: "",
        mobile: "",
        photo: null,
        location: "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error reporting found item:", error);
      alert("Failed to report the found item. Please try again.");
    } finally {
      setIsUploading(false); // End upload process
    }
  };

  return (
    <div className="bg-red-100 flex py-3">
      <div className="bg-red-200 p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Report Found Item
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Subject Name</label>
            <input
              type="text"
              value={foundItem.subject}
              onChange={(e) =>
                setFoundItem({ ...foundItem, subject: e.target.value })
              }
              className="w-full p-2 mt-1 border rounded-md text-sm"
              placeholder="Item name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Description</label>
            <textarea
              value={foundItem.description}
              onChange={(e) =>
                setFoundItem({ ...foundItem, description: e.target.value })
              }
              className="w-full p-2 mt-1 border rounded-md text-sm"
              placeholder="Item description"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Location</label>
            <input
              type="text"
              value={foundItem.location}
              onChange={(e) =>
                setFoundItem({ ...foundItem, location: e.target.value })
              }
              className="w-full p-2 mt-1 border rounded-md text-sm"
              placeholder="Location"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Date & Time</label>
            <input
              type="datetime-local"
              value={foundItem.date}
              onChange={(e) =>
                setFoundItem({ ...foundItem, date: e.target.value })
              }
              className="w-full p-2 mt-1 border rounded-md text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Mobile Number</label>
            <input
              type="tel"
              pattern="[0-9]{11}"
              value={foundItem.mobile}
              onChange={(e) =>
                setFoundItem({ ...foundItem, mobile: e.target.value })
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
                setFoundItem({ ...foundItem, photo: e.target.files[0] })
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

export default FoundItem;
