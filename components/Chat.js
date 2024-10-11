import React, { useState } from "react";

const Chat = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [conversations, setConversations] = useState({
    1: [
      { sender: "Alice", message: "Hey! How are you?" },
      { sender: "You", message: "I am good, how about you?" },
    ],
    2: [
      { sender: "Bob", message: "Hello, are you there?" },
      { sender: "You", message: "Yes, I am here!" },
    ],
    3: [
      { sender: "Charlie", message: "Good morning!" },
      { sender: "You", message: "Good morning to you too!" },
    ],
  });

  const persons = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  const handleSelectPerson = (person) => {
    setSelectedPerson(person);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() === "" || !selectedPerson) return;

    const newMessage = { sender: "You", message: messageInput };

    setConversations((prevConversations) => ({
      ...prevConversations,
      [selectedPerson.id]: [
        ...prevConversations[selectedPerson.id],
        newMessage,
      ],
    }));

    setMessageInput(""); // Clear the input field after sending
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar: Persons List */}
      <div className="w-1/3 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Chats</h2>
        <ul>
          {persons.map((person) => (
            <li
              key={person.id}
              onClick={() => handleSelectPerson(person)}
              className={`p-2 mb-2 cursor-pointer rounded-lg ${
                selectedPerson?.id === person.id
                  ? "bg-indigo-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {person.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side: Conversation */}
      <div className="w-2/3 bg-gray-100 p-6 flex flex-col">
        {selectedPerson ? (
          <>
            <h2 className="text-lg font-bold mb-4">
              Chat with {selectedPerson.name}
            </h2>

            <div className="flex-grow overflow-y-auto bg-white shadow p-4 rounded-lg">
              {conversations[selectedPerson.id].map((msg, index) => (
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
              ))}
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
          </>
        ) : (
          <p className="text-gray-500">Select a person to start a chat.</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
