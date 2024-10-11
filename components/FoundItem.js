import React, { useState } from "react";

const FoundItem = () => {
  const [foundItem, setFoundItem] = useState({
    subject: "",
    description: "",
    date: "",
    mobile: "",
    photo: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle found item submission logic here
  };

  return (
    <div className="bg-red-50 flex py-3">
    <div className="bg-red-100 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-bold text-gray-700 mb-4">Report Found Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm">Subject Name</label>
          <input
            type="text"
            value={foundItem.subject}
            onChange={(e) => setFoundItem({ ...foundItem, subject: e.target.value })}
            className="w-full p-2 mt-1 border rounded-md text-sm"
            placeholder="Item name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm">Description</label>
          <textarea
            value={foundItem.description}
            onChange={(e) => setFoundItem({ ...foundItem, description: e.target.value })}
            className="w-full p-2 mt-1 border rounded-md text-sm"
            placeholder="Item description"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm">Date & Time</label>
          <input
            type="datetime-local"
            value={foundItem.date}
            onChange={(e) => setFoundItem({ ...foundItem, date: e.target.value })}
            className="w-full p-2 mt-1 border rounded-md text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm">Mobile Number</label>
          <input
            type="tel"
            pattern="[0-9]{10}"
            value={foundItem.mobile}
            onChange={(e) => setFoundItem({ ...foundItem, mobile: e.target.value })}
            className="w-full p-2 mt-1 border rounded-md text-sm"
            placeholder="Mobile"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm">Add Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFoundItem({ ...foundItem, photo: e.target.files[0] })}
            className="w-full p-2 mt-1 border rounded-md text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-md font-medium hover:bg-red-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default FoundItem;
