import React, { useState } from "react";

const UpdateItem = () => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemImage, setItemImage] = useState(null);
  const [contactInfo, setContactInfo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic (e.g., API call)
    console.log("Item Updated:", { itemName, itemDescription, itemImage, contactInfo });
    // Reset the form or show a success message after submission
  };

  return (
    <div className="bg-slate-100 py-10 px-4 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Update Item</h1>
        <p className="text-center text-black mb-8">
          Use this form to update the details of your lost or found item.
        </p>

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="itemName">
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="itemDescription">
              Item Description
            </label>
            <textarea
              id="itemDescription"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="itemImage">
              Item Image
            </label>
            <input
              type="file"
              id="itemImage"
              onChange={(e) => setItemImage(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg p-3"
              accept="image/*"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="contactInfo">
              Contact Information
            </label>
            <input
              type="text"
              id="contactInfo"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#00df9a] text-white font-semibold py-3 rounded-lg hover:bg-[#00b888] transition-all duration-200"
          >
            Update Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
