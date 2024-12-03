import RootLayout from "@/components/wrapper";
import ChatWindow from "@/components/dashboardComponents/Chat/ChatWindow";
import { useRouter } from "next/router";
import ChatList from "@/components/dashboardComponents/Chat/ChatList";

export default function ChatPage() {
  const router = useRouter();
  const { username } = router.query;

  if (!username) {
    return <p>Loading...</p>; // Handles the case when `username` is undefined
  }
  console.log(username);
  return (
    <RootLayout>
      <div className="flex h-screen">
        <ChatList />
        <ChatWindow username={username} />
      </div>
    </RootLayout>
  );
}
