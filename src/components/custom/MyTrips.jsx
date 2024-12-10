import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { db } from "../../services/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";

const PEXELS_API_KEY = import.meta.env.REACT_APP_PEXELS_API_KEY;

// Helper function to fetch an image URL from Pexels
const fetchImageFromPexels = async (query) => {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
      params: {
          query: location,
          per_page: 1,
      },
    });
    if (response.data.photos && response.data.photos.length > 0) {
      return response.data.photos[0].src.medium;
    }
    return "https://via.placeholder.com/400x300?text=Image+Not+Available"; // Fallback image
  } catch (error) {
    console.error("Error fetching image from Pexels:", error);
    return "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"; // Fallback image on error
  }
};

const MyTrips = () => {
  const { userId } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      if (!userId) return;

      try {
        const tripsRef = collection(db, "trips");
        const q = query(tripsRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const userTrips = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const tripData = { id: doc.id, ...doc.data() };
            if (tripData.aiResponse) {
              const destination = JSON.parse(tripData.aiResponse)?.trip_details?.destination || "Travel";
              tripData.image = await fetchImageFromPexels(destination);
            } else {
              tripData.image = "https://via.placeholder.com/400x300?text=Default+Image";
            }
            return tripData;
          })
        );

        setTrips(userTrips);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center my-8">
        <TailSpin color="#00BFFF" height={50} width={50} />
      </div>
    );
  }

  if (trips.length === 0) {
    return <div className="rounded-xl bg-white p-6 text-center text-gray-600 shadow-sm">You have no trips yet!</div>;
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-8 p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {trips.map((trip) => (
        <Card
          key={trip.id}
          image={trip.image}
          date={new Date(trip.createdAt).toLocaleDateString()}
          title={trip.location}
          description={`Days: ${trip.noOfDays} | Budget: ${trip.budget} | Travelers: ${trip.traveler}`}
          onClick={() => navigate(`/view-trips/${trip.id}`)}
        />
      ))}
    </div>
  );
};

export default MyTrips;
