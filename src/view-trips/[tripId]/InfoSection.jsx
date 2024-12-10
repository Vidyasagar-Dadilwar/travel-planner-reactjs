import React from "react";
import { FaMapMarkerAlt, FaUserFriends, FaCalendarAlt, FaRupeeSign } from "react-icons/fa";

const InfoSection = ({ trip }) => {
  const { destination, duration, travelers, budget, best_time_to_visit } = trip.trip_details;

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Trip Overview</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-3 text-coral-500" />
            <span className="mr-2 font-medium">Destination:</span>
            <span className="text-gray-600">{destination}</span>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-3 text-coral-500" />
            <span className="mr-2 font-medium">Duration:</span>
            <span className="text-gray-600">{duration}</span>
          </div>
          <div className="flex items-center">
            <FaUserFriends className="mr-3 text-coral-500" />
            <span className="mr-2 font-medium">Travelers:</span>
            <span className="text-gray-600">{travelers}</span>
          </div>
          <div className="flex items-center">
            <FaRupeeSign className="mr-3 text-coral-500" />
            <span className="mr-2 font-medium">Budget:</span>
            <span className="text-gray-600">{budget}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2 font-medium">Best Time to Visit:</span>
            <span className="text-gray-600">{best_time_to_visit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;

