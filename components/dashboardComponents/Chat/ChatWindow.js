import { db } from "@/config/firebaseConfig";
import { useChatStore } from "@/store/chatStore";
import { useUserStore } from "@/store/userStore";
import {
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";

const ChatWindow = ({ username }) => {
  const [chat, setChat] = useState(null); // For storing chat data
  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();
  const [messageInput, setMessageInput] = useState("");
  const endRef = useRef(null);

  // Automatically scroll to the end of the chat
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Listen for updates to the chat document in Firestore
  useEffect(() => {
    if (!chatId) return;

    const chatDoc = doc(db, "chats", chatId);
    const unSub = onSnapshot(chatDoc, (res) => {
      const chatData = res.data();
      setChat(chatData);

      // Mark incoming messages as seen
      if (chatData?.messages) {
        const updatedMessages = chatData.messages.map((msg) =>
          msg.senderId !== currentUser.id && !msg.seen
            ? { ...msg, seen: true }
            : msg
        );
        updateDoc(chatDoc, { messages: updatedMessages });
      }
    });

    return () => {
      unSub();
    };
  }, [chatId, currentUser.id]);

  const handleSendMessage = async () => {
    if (messageInput.trim() === "" || !chatId) return;
    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          message: messageInput,
          timestamp: new Date().toISOString(),
        }),
      });
      const userIDs = [currentUser.id, user.id];
      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userChats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);
        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          if (chatIndex !== -1) {
            userChatsData.chats[chatIndex] = {
              ...userChatsData.chats[chatIndex],
              lastMessage: messageInput,
              isSeen: id === currentUser.id,
              updatedAt: new Date().toISOString(),
            };

            await updateDoc(userChatsRef, {
              chats: userChatsData.chats,
            });
          }
        }

        setMessageInput("");
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };
  return (
    <div className="w-full bg-gray-100 p-6 flex flex-col">
      <h2 className="text-lg font-bold mb-4">Chat with {username}</h2>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto bg-white shadow p-4 rounded-lg">
        {chat?.messages?.length > 0 ? (
          chat.messages.map((msg, index) => {
            const isLastSeen =
              msg.senderId === currentUser.id &&
              msg.seen &&
              index ===
                chat.messages
                  .map((m, i) =>
                    m.senderId === currentUser.id && m.seen ? i : -1
                  )
                  .filter((i) => i !== -1)
                  .pop();

            return (
              <div
                key={index}
                className={`mb-4 flex ${
                  msg.senderId === currentUser.id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg shadow ${
                    msg.senderId === currentUser.id
                      ? "bg-indigo-600 text-white text-right"
                      : "bg-gray-200 text-left"
                  }`}
                >
                  <p className="break-words">{msg.message}</p>
                  <p className="text-xs mt-1 text-gray-400">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {isLastSeen && (
                      <span className="text-green-500 ml-2">Seen</span>
                    )}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No messages yet.</p>
        )}
        <div ref={endRef} />
      </div>

      {/* Message Input */}
      <div className="mt-4 flex">
        <input
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-3 border rounded-md"
        />
        <button
          onClick={handleSendMessage}
          className="bg-indigo-600 text-white p-3 ml-2 rounded-md hover:bg-indigo-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
