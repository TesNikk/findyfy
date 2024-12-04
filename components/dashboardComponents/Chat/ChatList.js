import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const ChatList = () => {
  const { currentUser } = useUserStore();
  const [chats, setChats] = useState([]);
  useEffect(() => {
    if (!currentUser || !currentUser.id) {
      console.error("currentUser is not defined");
      return;
    }
    console.log("current user id: ", currentUser.id);
    const unSub = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        const data = res.data();
        if (!data || !Array.isArray(data.chats)) {
          console.warn("No chats available");
          setChats([]); // Set an empty array if no chats are found
          return;
        }

        const items = data.chats;
        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.exists() ? userDocSnap.data() : null;
          console.log("item in chatlist: ", item);
          console.log("user in chatlist: ", user);
          return {
            ...item,
            username: user?.username || "Unk", // Default to "Unknown" if username is not available
            lastMessage: item.lastMessage || "No message yet", // Handle missing lastMessage
          };
        });

        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt)); // Sort chats by updatedAt
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser?.id]);

  return (
    <div className="w-1/3 bg-gray-800 text-white p-4">
      <h2 className="text-lg font-bold mb-4">Chats</h2>
      <ul>
        {chats.length > 0 ? (
          chats.map((chat, index) => (
            <li
              key={index}
              className="p-2 mb-2 cursor-pointer rounded-lg bg-gray-700 hover:bg-gray-600"
            >
              <div>
                <Link
                  className="block hover:underline"
                  href={`/dashboard/chats/${chat.username}`}
                >
                  <span className="font-bold">{chat.username}</span>
                </Link>
                <p className="text-sm text-gray-400">{chat.lastMessage}</p>
              </div>
            </li>
          ))
        ) : (
          <p>No chats available</p>
        )}
      </ul>
    </div>
  );
};

export default ChatList;
