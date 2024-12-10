import React from "react";
import { FaClock, FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";

const PlacesToVisit = ({ itinerary }) => {
  if (!itinerary || Object.keys(itinerary).length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 text-center text-gray-600 shadow-sm">
        No itinerary available for this trip.
      </div>
    );
  }

  const openInMaps = (placeName) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Itinerary</h2>
        <div className="divide-y divide-gray-100">
          {Object.entries(itinerary).map(([day, details], index) => (
            <div
              key={index}
              className="group space-y-4 py-6 first:pt-0 last:pb-0"
            >
              <h3 className="text-xl font-semibold text-gray-900">{day.toUpperCase()}</h3>
              <div className="flex items-center text-sm text-gray-600">
                <FaClock className="mr-2 text-coral-500" />
                {details?.time || "N/A"}
              </div>
              <p className="text-gray-600">{details?.activity || "N/A"}</p>
              <div className="space-y-6">
                {details?.places_to_visit?.map((place, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-4 rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100 sm:flex-row"
                  >
                    <img
                      src={`https://source.unsplash.com/featured/400x300/?${encodeURIComponent(place?.place_name)},landmark`}
                      alt={place?.place_name || "Place"}
                      className="h-24 w-24 rounded-lg object-cover sm:h-32 sm:w-32"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80";
                      }}
                    />
                    <div className="flex-1">
                      <button
                        onClick={() => openInMaps(place?.place_name)}
                        className="mb-2 flex items-center font-medium text-gray-900 hover:text-coral-500 transition-colors duration-200"
                        aria-label={`View ${place?.place_name || "Place"} on map`}
                      >
                        <FaMapMarkerAlt className="mr-2 text-coral-500" />
                        {place?.place_name || "N/A"}
                        <FaExternalLinkAlt className="ml-2 text-sm" />
                      </button>
                      <p className="text-sm text-gray-600">{place?.place_details || "N/A"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacesToVisit;

