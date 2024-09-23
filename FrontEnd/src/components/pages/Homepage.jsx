import React from "react";

function Homepage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <img
          src="https://cdn-widget-assets.yotpo.com/static_assets/5WP7_BT1IkmNz_X17JhNsQ/images/image_2022_03_16_17_42_58_581"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-4">JOIN</h1>
        <div className="flex items-center mb-4">
          <img
            src="//www.stevemadden.com/cdn/shop/files/LOGO_ON_WHITE_fca4eb23-117e-48ff-9180-16c8855258ef_100x.png?v=1647854305"
            alt="Go to SM PASS"
            width="150"
            height="200"
            loading="lazy"
            className="opacity-100"
          />
        </div>
        <p className="text-center text-2xl font-medium mb-4">
          MEMBERS GET EXCLUSIVE OFFERS, REWARDS AND EVEN EARLY ACCESS TO NEW
          PRODUCTS.
        </p>
        <div className="flex space-x-4">
          <button className="px-6 py-2 bg-black text-white font-bold rounded-full">
            JOIN NOW
          </button>
          <button className="px-6 py-2 bg-black text-white font-bold rounded-full">
            LOG IN
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
