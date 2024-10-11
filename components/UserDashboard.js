import Link from "next/link";
import React from "react";

const UserDashboard = () => {
  return (
    <div className="bg-red-50 py-10 px-4 min-h-screen">
      <div className="container mx-auto">
        {/* Dashboard Header */}
        <h1 className="text-4xl font-bold text-center mb-4">User Dashboard</h1>
        <p className="text-center text-black mb-8">
          With the use of our easy-to-use dashboard, you can control your very
          own Findyfy account and make the best use of it.
        </p>

        {/* Dashboard Content */}
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          {/* Left Sidebar - Dashboard Menu */}
          <div className="bg-white shadow-lg rounded-lg p-6 lg:w-1/4 h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
            <div className="flex-grow">
              <Link href="/dashboard/profile">
                <button className="mb-3 w-full bg-gray-200 text-gray-700 p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 hover:text-gray-100 transition-all duration-200">
                  <span>Your Profile</span>
                  <span>➔</span>
                </button>
              </Link>

              <Link href="/dashboard/settings">
                <button className="mb-3 w-full bg-gray-200 text-gray-700 p-3  rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 hover:text-gray-100 transition-all duration-200">
                  <span>Settings</span>
                  <span>➔</span>
                </button>
              </Link>

              <Link href="/dashboard/chats">
                <button className="mb-3 w-full bg-gray-200 text-gray-700 p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 hover:text-gray-100 transition-all duration-200">
                  <span>Chats</span>
                  <span>➔</span>
                </button>
              </Link>

              <Link href="/dashboard/update">
                <button className="mb-3 w-full bg-gray-200 text-gray-700 p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 hover:text-gray-100 transition-all duration-200">
                  <span>Update Items</span>
                  <span>➔</span>
                </button>
              </Link>

              <Link href="/dashboard/help">
                <button className="mb-3 w-full bg-gray-200 text-gray-700 p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 hover:text-gray-100 transition-all duration-200">
                  <span>Help</span>
                  <span>➔</span>
                </button>
              </Link>

              <Link href="/dashboard/aboutUs">
                <button className="mb-3 w-full bg-gray-200 text-gray-700 p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 hover:text-gray-100 transition-all duration-200">
                  <span>About Us</span>
                  <span>➔</span>
                </button>
              </Link>

              <Link href="/dashboard/questions">
                <button className="mb-3 w-full bg-gray-200 text-gray-700 p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 hover:text-gray-100 transition-all duration-200">
                  <span>Questions</span>
                  <span>➔</span>
                </button>
              </Link>

              <Link href="/dashboard/logOut">
                <button className="w-full bg-gray-200 text-gray-700 p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 hover:text-gray-100 transition-all duration-200">
                  <span>Log Out</span>
                  <span>➔</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Content - Lost/Found Items */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex-1 flex flex-col h-full">
            {/* Lost and Found Items Container */}
            <div className="flex flex-col justify-between h-full">
              {/* Lost Items */}
              <div className="flex flex-col mb-8 h-1/2">
                <h3 className="text-2xl font-semibold mb-4">
                  Lost Items Reported
                </h3>
                <div className="grid grid-cols-3 gap-4 h-full font-semibold">
                  <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center hover:bg-gray-200 hover:shadow-lg transition-all duration-200">
                    <img
                      src="/assets/image/watch.png"
                      alt="Watch"
                      className="rounded-md mb-2 object-cover h-48 w-full"
                    />
                    <span>Watch</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center hover:bg-gray-200 hover:shadow-lg transition-all duration-200">
                    <img
                      src="/assets/image/wallet.png"
                      alt="Wallet"
                      className="rounded-md mb-2 object-cover h-48 w-full"
                    />
                    <span>Wallet</span>
                  </div>
                  <button className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 hover:shadow-lg transition-all duration-200">
                    <span className="text-4xl font-bold">+</span>
                  </button>
                </div>
              </div>

              {/* Found Items */}
              <div className="flex flex-col mt-4 h-1/2">
                <h3 className="text-2xl font-semibold mb-4">
                  Found Items Reported
                </h3>
                <div className="grid grid-cols-3 gap-4 h-full font-semibold">
                  <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center hover:bg-gray-200 hover:shadow-lg transition-all duration-200">
                    <img
                      src="/assets/image/jewellery.png"
                      alt="Jewelry"
                      className="rounded-md mb-2 object-cover h-48 w-full"
                    />
                    <span>Jewelry</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center hover:bg-gray-200 hover:shadow-lg transition-all duration-200">
                    <img
                      src="/assets/image/purse.png"
                      alt="Bag"
                      className="rounded-md mb-2 object-cover h-48 w-full"
                    />
                    <span>Bag</span>
                  </div>
                  <button className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 hover:shadow-lg transition-all duration-200">
                    <span className="text-4xl font-bold">+</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
