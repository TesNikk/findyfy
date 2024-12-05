import React, { useState, useEffect } from "react";
import { db } from "@/config/firebaseConfig";
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useUserStore } from "@/store/userStore";

const UserItems = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [filteredLostItems, setFilteredLostItems] = useState([]);
  const [filteredFoundItems, setFilteredFoundItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingIds, setDeletingIds] = useState(new Set()); // Keep track of item IDs being deleted
  const { currentUser } = useUserStore();

  // Function to delete an item
  const handleDeleteItem = async (collectionName, itemId) => {
    if (!currentUser?.id) return;
    
    try {
      // Add the item ID to the deleting set
      setDeletingIds((prev) => new Set(prev).add(itemId));

      const itemRef = doc(db, "users", currentUser.id, collectionName, itemId);
      await deleteDoc(itemRef);

      // Update the UI after deletion
      if (collectionName === "lostItems") {
        setLostItems((prev) => prev.filter((item) => item.id !== itemId));
        setFilteredLostItems((prev) =>
          prev.filter((item) => item.id !== itemId)
        );
      } else if (collectionName === "foundItems") {
        setFoundItems((prev) => prev.filter((item) => item.id !== itemId));
        setFilteredFoundItems((prev) =>
          prev.filter((item) => item.id !== itemId)
        );
      }

      console.log(`Item ${itemId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      // Remove the item ID from the deleting set
      setDeletingIds((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.delete(itemId);
        return updatedSet;
      });
    }
  };

  // Fetch user's lost and found items
  useEffect(() => {
    const fetchItems = async () => {
      if (!currentUser?.id) return;

      setLoading(true);

      try {
        const lostItemsRef = collection(
          db,
          "users",
          currentUser.id,
          "lostItems"
        );
        const foundItemsRef = collection(
          db,
          "users",
          currentUser.id,
          "foundItems"
        );

        const lostItemsSnapshot = await getDocs(lostItemsRef);
        const foundItemsSnapshot = await getDocs(foundItemsRef);

        const lostItemsData = lostItemsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const foundItemsData = foundItemsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLostItems(lostItemsData);
        setFoundItems(foundItemsData);
        setFilteredLostItems(lostItemsData);
        setFilteredFoundItems(foundItemsData);
      } catch (error) {
        console.error("Error fetching user items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [currentUser]);

  // Filter items based on search term
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
        <h1 className="text-4xl font-bold text-gray-700 mb-8">My Items</h1>
        <input
          type="text"
          placeholder="Search your items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-8 border rounded-md text-sm"
        />

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Lost Items Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-green-500">
                Lost Items
              </h2>
              {filteredLostItems.length > 0 ? (
                filteredLostItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 mb-4 rounded-md shadow-md"
                  >
                    <h2 className="text-lg font-bold text-gray-700">
                      <strong>Subject: </strong>
                      {item.subject}
                    </h2>
                    <p className="text-gray-600">
                      <b>Description: </b>
                      {item.description}
                    </p>
                    <p className="text-gray-600">
                      <b>Location: </b>
                      {item.location}
                    </p>
                    <p className="text-gray-600">
                      <b>Date: </b>
                      {item.date}
                    </p>
                    <p className="text-gray-600">
                      <b>Contact: </b>
                      {item.mobile}
                    </p>
                    {item.photo && (
                      <img
                        src={item.photo}
                        alt={item.subject}
                        className="mt-2 rounded-md"
                      />
                    )}
                    <button
                      onClick={() => handleDeleteItem("lostItems", item.id)}
                      className={`px-4 py-2 text-white rounded ${
                        deletingIds.has(item.id)
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                      disabled={deletingIds.has(item.id)}
                    >
                      {deletingIds.has(item.id) ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No lost items found.</p>
              )}
            </div>

            {/* Found Items Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-red-500">
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
                    <p className="text-gray-600">{item.location}</p>
                    <p className="text-gray-600">{item.date}</p>
                    <p className="text-gray-600">{item.mobile}</p>
                    {item.photo && (
                      <img
                        src={item.photo}
                        alt={item.subject}
                        className="mt-2 rounded-md"
                      />
                    )}
                    <button
                      onClick={() => handleDeleteItem("foundItems", item.id)}
                      className={`px-4 py-2 text-white rounded ${
                        deletingIds.has(item.id)
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                      disabled={deletingIds.has(item.id)}
                    >
                      {deletingIds.has(item.id) ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No found items found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserItems;
