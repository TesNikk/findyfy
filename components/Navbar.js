import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = ({ activeState }) => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex justify-between items-center h-20 max-w-[1340px] mx-auto px-4 text-white">
      {/* Logo and Findyfy Text in Flex */}
      <div className="flex items-center">
        <img
          src="/assets/icon/Findyfy-Icon.png"
          alt="Findyfy Logo"
          className="h-9 mr-3"
        />
        <h1 className="text-3xl font-bold text-[#00df9a]">Findyfy</h1>
      </div>

      {/* Navigation Menu */}
      <ul className="hidden md:flex">
        <li className="p-4 hover:text-[#00df9a] cursor-pointer">Home</li>
        <li className="p-4 hover:text-[#00df9a] cursor-pointer">Lost item</li>
        <li className="p-4 hover:text-[#00df9a] cursor-pointer">Found item</li>
        <li className="p-4 hover:text-[#00df9a] cursor-pointer">Dashboard</li>
        <li className="p-4 hover:text-[#00df9a] cursor-pointer">Log in</li>
        <li className="p-4 w-[90px] bg-[#00df9a] text-black font-semibold rounded-[25px] hover:bg-[#00c987] transition-all duration-300 cursor-pointer">
          Sign up
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Menu */}
      <ul
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">
          Findyfy
        </h1>
        <li className="p-4 border-b border-gray-600 hover:text-[#00df9a] cursor-pointer">
          Home
        </li>
        <li className="p-4 border-b border-gray-600 hover:text-[#00df9a] cursor-pointer">
          Lost
        </li>
        <li className="p-4 border-b border-gray-600 hover:text-[#00df9a] cursor-pointer">
          Found
        </li>
        <li className="p-4 border-b border-gray-600 hover:text-[#00df9a] cursor-pointer">
          About
        </li>
        <li className="p-4 hover:text-[#00df9a] cursor-pointer">Contact</li>
      </ul>
    </div>
  );
};

export default Navbar;