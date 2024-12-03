import RootLayout from "@/components/wrapper";
import ChatList from "@/components/dashboardComponents/Chat/ChatList";
import ChatWindow from "@/components/dashboardComponents/Chat/ChatWindow";
import { useRouter } from "next/router";

export default function ChatListPage() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <RootLayout>
      <div className="flex h-screen">
        <ChatList />
        <div className="w-2/3 bg-gray-100 flex items-center justify-center">
          {username ? (
            <ChatWindow username={username} />
          ) : (
            <p className="text-gray-500">Select a person to start chatting.</p>
          )}
        </div>
      </div>
    </RootLayout>
  );
}
