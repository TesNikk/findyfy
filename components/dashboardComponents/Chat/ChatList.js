import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useChatStore } from "@/store/chatStore";

const ChatList = () => {
  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (!currentUser || !currentUser.id) {
      console.error("currentUser is not defined");
      setLoading(false);
      return;
    }
    console.log("current user id: ", currentUser.id);

    const unSub = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        const data = res.data();
        if (!data || !Array.isArray(data.chats)) {
          console.warn("No chats available");
          setChats([]);
          setLoading(false);
          return;
        }

        const items = data.chats;
        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.exists() ? userDocSnap.data() : null;

          return {
            ...item,
            username: user?.username || "Unknown",
            lastMessage: item.lastMessage || "No message yet",
          };
        });

        const chatData = await Promise.all(promises);
        const uniqueChats = chatData.filter(
          (chat, index, self) =>
            index === self.findIndex((c) => c.receiverId === chat.receiverId)
        );
        setChats(uniqueChats.sort((a, b) => b.updatedAt - a.updatedAt));
        setLoading(false); // Loading complete
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser?.id]);

  const handleSelect = (chatId, user) => {
    // Update the chat store with the selected chatId and user
    changeChat(chatId, user);
    console.log("chatId and user: ", chatId, user);
  };

  return (
    <div className="w-1/3 bg-gray-800 text-white p-4">
      <h2 className="text-lg font-bold mb-4">Chats</h2>
      {loading ? (
        // Loading indicator
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <ul>
          {chats.length > 0 ? (
            chats.map((chat, index) => (
              <li
                key={index}
                className="p-2 mb-2 cursor-pointer rounded-lg bg-gray-700 hover:bg-gray-600"
              >
                <div>
                  {/* Username is clickable and updates the chat store */}
                  <Link
                    className="font-bold text-white hover:underline"
                    href={`/dashboard/chats/${chat.username}`}
                    onClick={(e) => {
                      handleSelect(chat.chatId, {
                        username: chat.username,
                        id: chat.receiverId,
                      });
                    }}
                  >
                    {chat.username}
                  </Link>
                  {/* Display the last message */}
                  <p className="text-sm text-gray-400">{chat.lastMessage}</p>
                </div>
              </li>
            ))
          ) : (
            <p>No chats available</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
