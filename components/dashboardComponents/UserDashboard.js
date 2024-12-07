import React, { useEffect, useState } from "react";
import Link from "next/link";
import { auth, db } from "@/config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useUserStore } from "@/store/userStore";
import { useAuthState } from "react-firebase-hooks/auth";

const UserDashboard = () => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useUserStore();
  const [user] = useAuthState(auth);
  // Fetch lost and found items
  useEffect(() => {
    if (!currentUser?.id) return;
    const fetchItems = async () => {
      setLoading(true);
      try {
        // Fetch lostItems subcollection
        const lostSnapshot = await getDocs(
          collection(db, "users", currentUser.id, "lostItems")
        );
        const foundSnapshot = await getDocs(
          collection(db, "users", currentUser.id, "foundItems")
        );

        // Map Firestore data to state
        setLostItems(
          lostSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setFoundItems(
          foundSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [currentUser]);
  const handleLogout = async () => {
    try {
      await auth.signOut();
      sessionStorage.removeItem("user");
      router.push("/log-in");
    } catch (error) {
      console.error("Logout Error: ", error.message);
    }
  };
  return (
    <div className="bg-red-100 py-10 px-4 min-h-screen">
      <div className="container mx-auto">
        {/* Dashboard Header */}
        <h1 className="text-4xl font-bold text-center mb-4">User Dashboard</h1>
        <p className="text-center text-black mb-8">
          With the use of our easy-to-use dashboard, you can control your very
          own Findyfy account and make the best use of it.
        </p>

        <div className="flex flex-col lg:flex-row gap-6 h-full">
          <div className="bg-red-200 shadow-lg rounded-lg p-6 lg:w-1/4 h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
            <div className="flex-grow">
              <Link href="/dashboard/profile">
                <button className="mb-3 w-full bg-red-300 p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-red-700 hover:text-red-100 transition-all duration-200">
                  <span>Your Profile</span>
                  <span>➔</span>
                </button>
              </Link>
              <Link href="/dashboard/settings">
                <button className="mb-3 w-full bg-red-300  p-3  rounded-lg flex items-center justify-between cursor-pointer hover:bg-red-700 hover:text-red-100 transition-all duration-200">
                  <span>Settings</span>
                  <span>➔</span>
                </button>
              </Link>

              <Link href="/dashboard/chats">
                <button className="mb-3 w-full bg-red-300 p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-red-700 hover:text-red-100 transition-all duration-200">
                  <span>Chats</span>
                  <span>➔</span>
                </button>
              </Link>

              <Link href="/dashboard/reportedItems">
                <button className="mb-3 w-full bg-red-300 p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-red-700 hover:text-red-100 transition-all duration-200">
                  <span>Reported Items</span>
                  <span>➔</span>
                </button>
              </Link>

              <Link href="/dashboard/help">
                <button className="mb-3 w-full bg-red-300  p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-red-700 hover:text-red-100 transition-all duration-200">
                  <span>Help</span>
                  <span>➔</span>
                </button>
              </Link>

              <Link href="/aboutUs">
                <button className="mb-3 w-full bg-red-300  p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-red-700 hover:text-red-100 transition-all duration-200">
                  <span>About Us</span>
                  <span>➔</span>
                </button>
              </Link>

              <Link href="/dashboard/questions">
                <button className="mb-3 w-full bg-red-300  p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-red-700 hover:text-red-100 transition-all duration-200">
                  <span>Questions</span>
                  <span>➔</span>
                </button>
              </Link>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-300  p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-red-700 hover:text-red-100 transition-all duration-200"
                >
                  <span>Log Out</span>
                  <span>➔</span>
                </button>
              ) : (
                <Link href="/log-in">
                  <button className="w-full bg-red-300  p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-red-700 hover:text-red-100 transition-all duration-200">
                    <span>Log Out</span>
                    <span>➔</span>
                  </button>
                </Link>
              )}
              {/* <Link href="/dashboard/logOut">
                <button className="w-full bg-red-300  p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-red-700 hover:text-red-100 transition-all duration-200">
                  <span>Log Out</span>
                  <span>➔</span>
                </button>
              </Link> */}
            </div>
          </div>
          {/* Right Content - Lost/Found Items */}
          <div className="bg-red-200 shadow-lg rounded-lg p-6 flex-1 flex flex-col h-full">
            {loading ? (
              <p className="text-center text-lg">Loading...</p>
            ) : (
              <div className="flex flex-col justify-between h-full">
                {/* Lost Items */}
                <div className="flex flex-col mb-8 h-1/2">
                  <h3 className="text-2xl font-semibold mb-4">
                    Lost Items Reported
                  </h3>
                  <div className="grid grid-cols-3 gap-4 h-full font-semibold">
                    {lostItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-red-300 rounded-lg p-4 flex flex-col items-center hover:bg-red-500 hover:shadow-lg transition-all duration-200"
                      >
                        <img
                          src={item.photo || "/assets/image/placeholder.png"} // Fixed field
                          alt={item.subject || "Lost Item"}
                          className="rounded-md mb-2 object-cover h-48 w-full"
                        />
                        <span>{item.subject || "Unknown Item"}</span>
                      </div>
                    ))}
                    <Link
                      href="/lost-item"
                      className="bg-red-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-red-500 hover:shadow-lg transition-all duration-200"
                    >
                      <button>
                        <span className="text-4xl font-bold">+</span>
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Found Items */}
                <div className="flex flex-col mt-4 h-1/2">
                  <h3 className="text-2xl font-semibold mb-4">
                    Found Items Reported
                  </h3>
                  <div className="grid grid-cols-3 gap-4 h-full font-semibold">
                    {foundItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-red-300 rounded-lg p-4 flex flex-col items-center hover:bg-red-500 hover:shadow-lg transition-all duration-200"
                      >
                        <img
                          src={item.photo || "/assets/image/placeholder.png"} // Fixed field
                          alt={item.subject || "Found Item"}
                          className="rounded-md mb-2 object-cover h-48 w-full"
                        />
                        <span>{item.subject || "Unknown Item"}</span>
                      </div>
                    ))}
                    <Link
                      href="/found-item"
                      className="bg-red-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-red-500 hover:shadow-lg transition-all duration-200"
                    >
                      <button>
                        <span className="text-4xl font-bold">+</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
