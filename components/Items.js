import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { db } from "@/config/firebaseConfig"; // Ensure Firebase is configured
import {
  collection,
  query,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { useUserStore } from "@/store/userStore";

const Items = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [filteredLostItems, setFilteredLostItems] = useState([]);
  const [filteredFoundItems, setFilteredFoundItems] = useState([]);
  const { currentUser } = useUserStore();
  const router = useRouter();
  const handleAddToChat = async (userId, userName) => {
    // if (!userName || userName === "Unknown") {
    //   console.warn("Cannot add an unknown user to the chat.");
    //   return;
    // }
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userChats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
        //participants: [userName], // Save the username of the reported user
      });
      const userChatDocRef = doc(userChatsRef, userId);
      const currentUserChatDocRef = doc(userChatsRef, currentUser.id);

      // Check if the user chat document exists, if not create it
      const userChatDocSnap = await getDoc(userChatDocRef);
      if (!userChatDocSnap.exists()) {
        await setDoc(userChatDocRef, { chats: [] });
      }

      // Check if the current user chat document exists, if not create it
      const currentUserChatDocSnap = await getDoc(currentUserChatDocRef);
      if (!currentUserChatDocSnap.exists()) {
        await setDoc(currentUserChatDocRef, { chats: [] });
      }

      await updateDoc(userChatDocRef, {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });
      await updateDoc(currentUserChatDocRef, {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: userId,
          updatedAt: Date.now(),
        }),
      });
      console.log(`Chat created with ID: ${newChatRef.id}`);
      router.push(`/dashboard/chats`);
      //router.push(`/dashboard/chats/${userName ? userName : "Unknown"}`);
    } catch (err) {
      console.error("Failed to add user to chat:", err);
    }
  };

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
            userId: userDoc.id,
            ...doc.data(),
          })),
        ];

        foundItemsData = [
          ...foundItemsData,
          ...foundItemsSnapshot.docs.map((doc) => ({
            id: doc.id,
            userName,
            userId: userDoc.id,
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
    <div className="w-full py-24 px-4 bg-red-50">
      <div className="max-w-[1240px] mx-auto">
        <h1 className="text-4xl font-bold text-red-600 mb-8">All Items</h1>
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
            <h2 className="text-2xl font-bold text-red-500 mb-4">Lost Items</h2>
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
                    <button
                      onClick={() =>
                        handleAddToChat(item.userId, item.userName)
                      }
                      className="text-blue-500 hover:underline"
                    >
                      {item.userName ? item.userName : "Unknown"}
                    </button>
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
            <h2 className="text-2xl font-bold text-green-500 mb-4">
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

                  <p className="text-gray-600">
                    Reported by:{" "}
                    <button
                      onClick={() =>
                        handleAddToChat(item.userId, item.userName)
                      }
                      className="text-blue-500 hover:underline"
                    >
                      {item.userName ? item.userName : "Unknown"}
                    </button>
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
