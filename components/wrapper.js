import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebaseConfig";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./footer";

export default function RootLayout({ children, ...props }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  // Show a loading spinner while checking user authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-3">
          {/* Loading Spinner */}
          <div className="w-10 h-10 border-4 border-t-[#00df9a] border-gray-300 rounded-full animate-spin"></div>
          <p className="text-gray-700 text-sm font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login page if the user is not logged in
  if (!user) {
    router.push("/log-in");
    return null; // Prevent further rendering
  }

  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
