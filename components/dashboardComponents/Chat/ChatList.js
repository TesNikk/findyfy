import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ChatList = () => {
  const router = useRouter();
  const { username } = router.query;
  const [persons, setPersons] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ]);

  useEffect(() => {
    if (username && !persons.some((person) => person.name === username)) {
      setPersons((prevPersons) => [
        ...prevPersons,
        { id: prevPersons.length + 1, name: username },
      ]);
    }
  }, [username, persons]);
  console.log(username);
  return (
    <div className="w-1/3 bg-gray-800 text-white p-4">
      <h2 className="text-lg font-bold mb-4">Chats</h2>
      <ul>
        {persons.map((person) => (
          <li
            key={person.id}
            className="p-2 mb-2 cursor-pointer rounded-lg bg-gray-700 hover:bg-gray-600"
          >
            <Link
              className="block hover:underline"
              href={`/dashboard/chats/${person.name}`}
            >
              {person.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
