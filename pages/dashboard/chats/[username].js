import RootLayout from "@/components/wrapper";
import ChatWindow from "@/components/dashboardComponents/Chat/ChatWindow";
import { useRouter } from "next/router";
import ChatList from "@/components/dashboardComponents/Chat/ChatList";
import { useChatStore } from "@/store/chatStore";

export default function ChatPage() {
  const router = useRouter();
  const { username } = router.query;
  const { chatId } = useChatStore();

  if (!username) {
    return <p>Loading...</p>; // Handles the case when `username` is undefined
  }

  return (
    <RootLayout>
      <div className="flex h-screen">
        <ChatList />
        <div
          className={`w-2/3 bg-gray-100 ${
            chatId ? "flex" : "flex items-center justify-center"
          }`}
        >
          {chatId ? (
            <ChatWindow username={username} />
          ) : (
            <p className="text-gray-500">Select a person to start chatting.</p>
          )}
        </div>
      </div>
    </RootLayout>
  );
}
