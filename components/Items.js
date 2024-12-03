import React, { useState, useEffect } from "react";
import { db } from "@/config/firebaseConfig"; // Ensure Firebase is configured
import { collection, query, getDocs } from "firebase/firestore";
import Link from "next/link";

const Items = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [filteredLostItems, setFilteredLostItems] = useState([]);
  const [filteredFoundItems, setFilteredFoundItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const usersRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersRef);

      let lostItemsData = [];
      let foundItemsData = [];

      for (const userDoc of usersSnapshot.docs) {
        const userRef = userDoc.ref;
        const userName = userDoc.data().username;
        const lostItemsRef = collection(userRef, "lostItems");
        const foundItemsRef = collection(userRef, "foundItems");

        const lostItemsSnapshot = await getDocs(lostItemsRef);
        const foundItemsSnapshot = await getDocs(foundItemsRef);

        lostItemsData = [
          ...lostItemsData,
          ...lostItemsSnapshot.docs.map((doc) => ({
            id: doc.id,
            userName,
            ...doc.data(),
          })),
        ];

        foundItemsData = [
          ...foundItemsData,
          ...foundItemsSnapshot.docs.map((doc) => ({
            id: doc.id,
            userName,
            ...doc.data(),
          })),
        ];
      }

      setLostItems(lostItemsData);
      setFoundItems(foundItemsData);
      setFilteredLostItems(lostItemsData);
      setFilteredFoundItems(foundItemsData);
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const filteredLost = lostItems.filter((item) =>
      item.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredFound = foundItems.filter((item) =>
      item.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredLostItems(filteredLost);
    setFilteredFoundItems(filteredFound);
  }, [searchTerm, lostItems, foundItems]);

  return (
    <div className="w-full py-24 px-4 bg-gray-50">
      <div className="max-w-[1240px] mx-auto">
        <h1 className="text-4xl font-bold text-gray-700 mb-8">All Items</h1>
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-8 border rounded-md text-sm"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Lost Items Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Lost Items
            </h2>
            {filteredLostItems.length > 0 ? (
              filteredLostItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 mb-4 rounded-md shadow-md"
                >
                  <h3 className="text-lg font-bold text-gray-700">
                    {item.subject}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-gray-600">{item.location}</p>
                  <p className="text-gray-600">{item.date}</p>
                  <p className="text-gray-600">{item.mobile}</p>
                  <p className="text-gray-600">
                    Reported by:{" "}
                    <Link
                      href={`/dashboard/chats/${
                        item.userName ? item.userName : "Unknown"
                      }`}
                      className="text-blue-500 hover:underline"
                    >
                      {item.userName ? item.userName : "Unknown"}
                    </Link>
                  </p>

                  {item.photo && (
                    <img
                      src={item.photo}
                      alt={item.subject}
                      className="mt-2 rounded-md"
                    />
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600">No lost items found.</p>
            )}
          </div>

          {/* Found Items Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Found Items
            </h2>
            {filteredFoundItems.length > 0 ? (
              filteredFoundItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 mb-4 rounded-md shadow-md"
                >
                  <h3 className="text-lg font-bold text-gray-700">
                    {item.subject}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-gray-600"> {item.location}</p>
                  <p className="text-gray-600">{item.date}</p>
                  <p className="text-gray-600">{item.mobile}</p>

                  <p className="text-gray-600">
                    Reported by:{" "}
                    <Link
                      href={`/dashboard/chats/${
                        item.userName ? item.userName : "Unknown"
                      }`}
                      className="text-blue-500 hover:underline"
                    >
                      {item.userName ? item.userName : "Unknown"}
                    </Link>
                  </p>

                  {item.photo && (
                    <img
                      src={item.photo}
                      alt={item.subject}
                      className="mt-2 rounded-md"
                    />
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600">No found items found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;
