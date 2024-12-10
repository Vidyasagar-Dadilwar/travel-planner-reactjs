import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../services/firebaseConfig";
import { toast } from "react-toastify";
import InfoSection from "./InfoSection";
import Hotels from "./Hotels";
import PlacesToVisit from "./PlacesToVisit";

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, "trips", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const tripData = docSnap.data().aiResponse;
        const res = await JSON.parse(tripData);
        setTrip(res);
      } else {
        toast.error("Trip data not found.");
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
      toast.error("Failed to fetch trip data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 sm:px-10 md:px-32 lg:px-56 xl:px-72">
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <p className="text-lg text-gray-600">Loading trip details...</p>
        </div>
      ) : trip ? (
        <div>
          <div className="relative h-96 w-full rounded-xl">
            <img
              src={`https://source.unsplash.com/featured/1600x900/?${encodeURIComponent(trip.trip_details.destination)},landmark`}
              alt={trip.trip_details.destination}
              className="h-full w-full rounded-xl object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80";
              }}
            />
            <div className="absolute inset-0 bg-black rounded-xl bg-opacity-40">
              <div className="flex h-full items-center justify-center">
                <h1 className="text-4xl font-bold text-center text-white md:text-6xl">
                  {trip.trip_details.destination}
                </h1>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
            <div className="space-y-8">
              <InfoSection trip={trip} />
              <Hotels hotels={trip.hotels || []} />
              <PlacesToVisit itinerary={trip.itinerary || {}} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <p className="text-lg text-gray-600">No trip details available.</p>
        </div>
      )}
    </div>
  );
};

export default ViewTrip;

