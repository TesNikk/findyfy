import Link from "next/link";
import { useState } from "react";

export default function ReportItem() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (card) => {
    setHoveredCard(card);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="bg-red-200 p-10 rounded-xl shadow-lg w-[800px] h-[600px] flex flex-col items-center justify-center">
        {/* Heading */}
        <h2 className="text-6xl font-bold mb-20">Report Item</h2>

        {/* Card container */}
        <div className="flex space-x-8">
          {/* Lost Item Card */}
          <Link href="/lost-item">
            <div
              className={`bg-red-300 w-64 h-64 p-8 rounded-lg shadow-lg transform ${
                hoveredCard === "lost" ? "scale-105" : ""
              } transition-transform duration-300 cursor-pointer relative flex flex-col items-center`}
              onMouseEnter={() => handleMouseEnter("lost")}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src="/assets/icon/lost.jpg"
                alt="Lost Item"
                className="h-24 w-24 mb-6 rounded-xl"
              />
              <h3 className="text-2xl font-bold text-center">Lost Item</h3>
              {hoveredCard === "lost" && (
                <span className="absolute bottom-4 right-4 text-red-500 text-3xl">
                  ✓
                </span>
              )}
            </div>
          </Link>

          {/* Found Item Card */}
          <Link href="/found-item">
            <div
              className={`bg-red-300 w-64 h-64 p-8 rounded-lg shadow-lg transform ${
                hoveredCard === "found" ? "scale-105" : ""
              } transition-transform duration-300 cursor-pointer relative flex flex-col items-center`}
              onMouseEnter={() => handleMouseEnter("found")}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src="/assets/icon/found.jpg"
                alt="Found Item"
                className="h-24 w-24 mb-6 rounded-xl"
              />
              <h3 className="text-2xl font-bold text-center">Found Item</h3>
              {hoveredCard === "found" && (
                <span className="absolute bottom-4 right-4 text-red-500 text-3xl">
                  ✓
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
