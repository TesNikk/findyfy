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
  const [imageFile, setImageFile] = useState(null);
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
    ); // Cloudinary cloud name

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

  const handleSendMessage = async (message = null, image = null) => {
    if ((message?.trim() === "" && !image) || !chatId) return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          message: message || "",
          image: image || null,
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
              lastMessage: message || "Image",
              isSeen: id === currentUser.id,
              updatedAt: new Date().toISOString(),
            };

            await updateDoc(userChatsRef, {
              chats: userChatsData.chats,
            });
          }
        }

        setMessageInput("");
        setImageFile(null);
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleImageSend = async () => {
    if (!imageFile) return;
    try {
      const imageUrl = await uploadToCloudinary(imageFile);
      handleSendMessage(null, imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage(messageInput);
    }
  };

  return (
    <div className="w-full bg-red-100 p-6 flex flex-col">
      <h2 className="text-lg font-bold text-red-600 mb-4">
        Chat with {username}
      </h2>

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
                      ? "bg-red-500 text-white text-right"
                      : "bg-red-200 text-gray-800 text-left"
                  }`}
                >
                  {msg.image ? (
                    <img
                      src={msg.image}
                      alt="User sent"
                      className="max-w-full max-h-60 rounded-lg mb-2"
                    />
                  ) : (
                    <p className="break-words">{msg.message}</p>
                  )}
                  <p className="text-xs mt-1 text-gray-600">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {isLastSeen && (
                      <span className="text-gray-200 ml-2">seen</span>
                    )}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-600">No messages yet.</p>
        )}
        <div ref={endRef} />
      </div>

      {/* Message Input */}
      <div className="mt-4 flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-3 border border-red-300 rounded-md focus:outline-none focus:border-red-500"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="hidden"
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="bg-red-200 p-3 ml-2 rounded-md cursor-pointer hover:bg-red-300"
        >
          📎
        </label>
        <button
          onClick={
            imageFile ? handleImageSend : () => handleSendMessage(messageInput)
          }
          className="bg-red-500 text-white p-3 ml-2 rounded-md hover:bg-red-600"
        >
          {imageFile ? "Send Image" : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
