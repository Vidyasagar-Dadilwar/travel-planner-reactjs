import React from "react";
import { FaMapMarkerAlt, FaStar, FaExternalLinkAlt } from "react-icons/fa";

const Hotels = ({ hotels }) => {
  // console.log("hptels", hotels, "Type of hotels ", typeof hotels[0]);  
  if (!hotels || hotels.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 text-center text-gray-600 shadow-sm">
        No hotels available for this trip.
      </div>
    );
  }

  const openInMaps = (hotelName, hotelAddress) => {
    const query = encodeURIComponent(`${hotelName}, ${hotelAddress}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Recommended Hotels</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.options.map((hotel, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={`https://source.unsplash.com/featured/600x400/?hotel,${encodeURIComponent(hotel.hotel_name)}`}
                  alt={hotel.hotel_name || "Hotel"}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80";
                  }}
                />                                                                                                  
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{hotel.hotel_name || "N/A"}</h3>
                <div className="space-y-2">
                  <p className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-coral-500" />
                    {hotel.hotel_address || "N/A"}
                  </p>
                  <p className="flex items-center text-sm text-gray-600">
                    <FaStar className="mr-2 text-yellow-400" />
                    Rating: {hotel.rating || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">Price: {hotel.price || "N/A"}</p>
                  <button
                    onClick={() => openInMaps(hotel.hotel_name, hotel.hotel_address)}
                    className="mt-3 inline-flex items-center rounded-lg bg-coral-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-600"
                  >
                    Search Hotel
                    <FaExternalLinkAlt className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hotels;

