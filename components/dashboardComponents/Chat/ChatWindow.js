import React, { useState } from "react";

const ChatWindow = ({ username }) => {
  const [messageInput, setMessageInput] = useState("");
  const [conversations, setConversations] = useState({
    Alice: [
      { sender: "Alice", message: "Hey! How are you?" },
      { sender: "You", message: "I am good, how about you?" },
    ],
    Bob: [
      { sender: "Bob", message: "Hello, are you there?" },
      { sender: "You", message: "Yes, I am here!" },
    ],
    Charlie: [
      { sender: "Charlie", message: "Good morning!" },
      { sender: "You", message: "Good morning to you too!" },
    ],
  });

  const handleSendMessage = () => {
    if (messageInput.trim() === "") return;

    const newMessage = { sender: "You", message: messageInput };

    setConversations((prevConversations) => ({
      ...prevConversations,
      [username]: [...(prevConversations[username] || []), newMessage],
    }));

    setMessageInput(""); // Clear input after sending
  };

  return (
    <div className="w-full bg-gray-100 p-6 flex flex-col">
      <h2 className="text-lg font-bold mb-4">Chat with {username}</h2>

      <div className="flex-grow overflow-y-auto bg-white shadow p-4 rounded-lg">
        {conversations[username]?.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.sender === "You" ? "text-right" : "text-left"
            }`}
          >
            <p
              className={`inline-block p-2 rounded-lg ${
                msg.sender === "You"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {msg.message}
            </p>
          </div>
        )) || <p>No messages yet.</p>}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
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
