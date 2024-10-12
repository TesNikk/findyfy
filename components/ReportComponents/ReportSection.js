import Link from "next/link";
import React, { useState } from "react";

const ReportSection = () => {
  // States for Lost Item form
  const [lostItem, setLostItem] = useState({
    subject: "",
    description: "",
    location: "",
    date: "",
    mobile: "",
    photo: null,
  });

  // States for Found Item form
  const [foundItem, setFoundItem] = useState({
    subject: "",
    description: "",
    date: "",
    mobile: "",
    photo: null,
    location: "",
  });

  const [activeForm, setActiveForm] = useState("lost"); // Manage which form is on top

  return (
    <div className="w-full py-24 px-4 bg-red-50 relative">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row relative">
        <div className="md:w-1/2 flex flex-col justify-center items-start">
          {/* Rounded Image */}
          <img
            src="/assets/image/holdingPhone.png"
            alt="Report Lost and Found Items"
            className="w-50 h-50 rounded-full mb-4 object-cover"
          />
          {/* Left Side: Text and Button */}
          <h2 className="text-4xl font-bold text-gray-700 mb-4">
            Report lost and found items
          </h2>
          <p className="text-lg text-gray-500 mb-4">
            You can easily report for your lost and found items now. It helps
            reunite lost items with their owners.
          </p>
          <Link href="/report-item">
          <button className="bg-red-500 text-white p-2 px-4 rounded-md font-medium  hover:bg-red-600 transition duration-300">
            Report item →
          </button>
          </Link>
        </div>

        {/* Right Side: Overlapping Forms */}
        <div className="md:w-1/2 relative h-[550px] flex justify-center items-center">
          {/* Lost Item Form */}
          <div
            onClick={() => setActiveForm("lost")}
            className={`absolute top-0 right-0 w-[300px] h-[510px] bg-red-100 p-4 rounded-xl shadow-2xl transition-transform duration-300 cursor-pointer transform ${
              activeForm === "lost"
                ? "z-10"
                : "z-0 translate-x-[-65%] translate-y-[20px]"
            } hover:z-20`}
          >
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Have you lost something?
            </h2>

            <div className="mb-2">
              <label className="block text-gray-700 text-sm">
                Subject Name
              </label>
              <input
                type="text"
                value={lostItem.subject}
                onChange={(e) =>
                  setLostItem({ ...lostItem, subject: e.target.value })
                }
                className="w-full p-1 mt-1 border rounded-md text-sm"
                placeholder="Item name"
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 text-sm">Description</label>
              <textarea
                value={lostItem.description}
                onChange={(e) =>
                  setLostItem({ ...lostItem, description: e.target.value })
                }
                className="w-full p-1 mt-1 border rounded-md text-sm"
                placeholder="Item description"
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 text-sm">Location</label>
              <input
                type="text"
                value={lostItem.location}
                onChange={(e) =>
                  setLostItem({ ...lostItem, location: e.target.value })
                }
                className="w-full p-1 mt-1 border rounded-md text-sm"
                placeholder="Location"
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 text-sm">Date & Time</label>
              <input
                type="datetime-local"
                value={lostItem.date}
                onChange={(e) =>
                  setLostItem({ ...lostItem, date: e.target.value })
                }
                className="w-full p-1 mt-1 border rounded-md text-sm"
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 text-sm">
                Mobile Number
              </label>
              <input
                type="tel"
                pattern="[0-9]{10}"
                value={lostItem.mobile}
                onChange={(e) =>
                  setLostItem({ ...lostItem, mobile: e.target.value })
                }
                className="w-full p-1 mt-1 border rounded-md text-sm"
                placeholder="Mobile"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm">Add Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFoundItem({ ...foundItem, photo: e.target.files[0] })
                }
                className="w-full p-1 mt-1 border border-gray-300 rounded-md bg-white text-sm"
              />
            </div>

            <button className="w-full bg-red-500 text-white p-1 rounded-md font-medium mt-2 text-sm  hover:bg-red-600 transition duration-300">
              Submit
            </button>
          </div>

          {/* Found Item Form */}
          <div
            onClick={() => setActiveForm("found")}
            className={`absolute top-0 right-0 w-[300px] h-[510px] bg-red-100 p-4 rounded-xl shadow-2xl transition-transform duration-300 cursor-pointer transform ${
              activeForm === "found"
                ? "z-10"
                : "z-0 translate-x-[-65%] translate-y-[80px]"
            } hover:z-20`}
          >
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Have you found something?
            </h2>

            <div className="mb-2">
              <label className="block text-gray-700 text-sm">
                Subject Name
              </label>
              <input
                type="text"
                value={foundItem.subject}
                onChange={(e) =>
                  setFoundItem({ ...foundItem, subject: e.target.value })
                }
                className="w-full p-1 mt-1 border rounded-md text-sm"
                placeholder="Item name"
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 text-sm">Description</label>
              <textarea
                value={foundItem.description}
                onChange={(e) =>
                  setFoundItem({ ...foundItem, description: e.target.value })
                }
                className="w-full p-1 mt-1 border rounded-md text-sm"
                placeholder="Item description"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm">Location</label>
              <input
                type="text"
                value={foundItem.location}
                onChange={(e) =>
                  setLostItem({ ...foundItem, location: e.target.value })
                }
                className="w-full p-1 mt-1 border rounded-md text-sm"
                placeholder="Location"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm">Date & Time</label>
              <input
                type="datetime-local"
                value={foundItem.date}
                onChange={(e) =>
                  setFoundItem({ ...foundItem, date: e.target.value })
                }
                className="w-full p-1 mt-1 border rounded-md text-sm"
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 text-sm">
                Mobile Number
              </label>
              <input
                type="tel"
                pattern="[0-9]{10}"
                value={foundItem.mobile}
                onChange={(e) =>
                  setFoundItem({ ...foundItem, mobile: e.target.value })
                }
                className="w-full p-1 mt-1 border rounded-md text-sm"
                placeholder="Mobile"
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 text-sm">Add Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFoundItem({ ...foundItem, photo: e.target.files[0] })
                }
                className="w-full p-1 mt-1 border border-gray-300 rounded-md bg-white text-sm"
              />
            </div>

            <button className="w-full bg-red-500 text-white p-1 rounded-md font-medium mt-2 text-sm  hover:bg-red-600 transition duration-300">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportSection;
