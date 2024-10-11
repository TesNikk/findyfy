import React from "react";

const CategorySection = () => {
  const categories = [
    { name: "Jewelry", image: "/assets/image/jewellery.png" },
    { name: "Camera", image: "/assets/image/camera.png" },
    { name: "Mobile Phone", image: "/assets/image/phone.avif" },
    { name: "Handbag", image: "/assets/image/purse.png" },
    { name: "Watch", image: "/assets/image/watch.png" },
    { name: "Shoe", image: "/assets/image/shoe.jpg" },
    { name: "Luggage", image: "/assets/image/luggage.jpg" },
    { name: "Credit Card", image: "/assets/image/visa.jpg" },
    { name: "Passport", image: "/assets/image/passport.jpg" },
    { name: "Laptop", image: "/assets/image/laptop.png" },
    { name: "Wallet", image: "/assets/image/wallet.png" },
    { name: "Eyewear", image: "/assets/image/eyewear.png" },
  ];

  return (
    <section className="py-12  bg-red-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          What are you looking for?
        </h2>
        <p className="text-lg text-gray-500 mb-8">
          We have a variety of items to list for. You can choose your items from
          categories and list them for us to find.
        </p>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover rounded-lg shadow-lg transition-transform group-hover:scale-110 duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
              <h3 className="absolute inset-x-0 bottom-0 rounded-b-lg text-white text-lg font-semibold text-center bg-opacity-50 bg-red-950 py-1 opacity-90 transition-opacity duration-300">
                {category.name}
              </h3>
            </div>
          ))}
        </div>

        <button className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition duration-300">
          View All Items →
        </button>
      </div>
    </section>
  );
};

export default CategorySection;
