import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '../components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelersList } from '../constants/options';
import { Button } from '../components/ui/button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { chatSession } from '../services/AiModel';
import { useUser, SignIn, SignUp } from '@clerk/clerk-react';
import { db } from '../services/firebaseConfig'; 
import { doc, setDoc, collection } from 'firebase/firestore'; 
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
  const { isSignedIn, user } = useUser(); // Check if user is logged in
  const [showSignUp, setShowSignUp] = useState(false); // Toggle between SignIn and SignUp
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate();
  const [formField, setFormField] = useState({
    location: '',
    noOfDays: '',
    budget: '',
    traveler: '',
  });

  // Generic function to handle form field changes
  const handleFormFieldChange = (name, value) => {
    setFormField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle input change and fetch suggestions
  const handleLocationInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${value}&format=json&addressdetails=1`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Function to handle selection of a suggestion
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.display_name); // Set input value to the selected place
    handleFormFieldChange('location', suggestion.display_name); // Update location in formField
    setSuggestions([]); // Clear suggestions
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!isSignedIn) {
      toast.error('Please log in to create a trip.');
      return;
    }

    // Validate fields
    const { location, noOfDays, budget, traveler } = formField;
    if (!location || !noOfDays || !budget || !traveler) {
      toast.error('All fields are required.');
      return;
    }
    if (noOfDays < 1 || noOfDays > 10) {
      toast.error('Please enter a number of days between 1 and 10.');
      return;
    }

    setLoading(true); // Start loading animation

    try {
      // Generate the final prompt
      const FINAL_PROMPT = AI_PROMPT
        .replaceAll('{location}', location)
        .replaceAll('{totalDays}', noOfDays)
        .replaceAll('{budget}', budget)
        .replaceAll('{traveler}', traveler);

      console.log(FINAL_PROMPT);

      toast.info('Trip details are send to db to save!');

      // Call AI model and get response
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const aiResponse = await result?.response?.text();
      console.log(aiResponse);

      // Prepare data for Firebase
      const tripData = {
        location,
        noOfDays,
        budget,
        traveler,
        aiResponse,
        userId: user.id, // Use Clerk's user ID to associate trip with the user
        createdAt: new Date().toISOString(), // Add timestamp
      };

      // Push data to Firestore
      const tripRef = doc(collection(db, 'trips')); // Create a new document in 'trips' collection
      await setDoc(tripRef, tripData);

      toast.success('Trip details saved successfully!');
      console.log('Trip saved:', tripData);

      navigate(`/view-trips/${tripRef.id}`);
    } catch (error) {
      console.error('Error submitting trip:', error);
      toast.error('Failed to create trip. Please try again later.');
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-8">
      <ToastContainer />
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🌴🏕️🏕️🌴</h2>
      <p className="text-gray-500 mt-3 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      {!isSignedIn ? (
        <div className="mt-10 w-full flex flex-col items-center">
          {showSignUp ? (
            <SignUp afterSignUpUrl="/" />
          ) : (
            <SignIn />
          )}
          <button
            className="mt-4 text-blue-600 hover:underline"
            onClick={() => setShowSignUp(!showSignUp)}
          >
            {showSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      ) : (
        <div className="mt-14 flex flex-col gap-8">
          {/* Form Fields */}
          <div>
            <h2 className="text-xl my-3 font-medium">Where are you planning to visit?</h2>
            <input
              type="text"
              value={query}
              onChange={handleLocationInputChange}
              placeholder="Search for a place"
              className="border border-gray-300 rounded-md w-full px-4 py-2"
            />
            {suggestions.length > 0 && (
              <ul className="border border-gray-300 rounded-md mt-2 bg-white">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
            <Input
              placeholder="Ex. 3"
              type="number"
              value={formField.noOfDays}
              onChange={(e) => handleFormFieldChange('noOfDays', e.target.value)}
            />
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-lg hover:shadow-lg cursor-pointer ${
                    formField.budget === item.title
                      ? 'bg-blue-100 border-blue-500 shadow-lg'
                      : 'border-gray-300'
                  }`}
                  onClick={() => handleFormFieldChange('budget', item.title)}
                >
                  <h2 className="text-3xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-gray-500 text-sm">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with on your next adventure?</h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectTravelersList.map((item, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-lg hover:shadow-lg cursor-pointer ${
                    formField.traveler === item.title
                      ? 'bg-blue-100 border-blue-500 shadow-lg'
                      : 'border-gray-300'
                  }`}
                  onClick={() => handleFormFieldChange('traveler', item.title)}
                >
                  <h2 className="text-3xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-gray-500 text-sm">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center my-8">
              <TailSpin color="#00BFFF" height={50} width={50} />
            </div>
          ) : (
            <Button className="my-4" onClick={handleSubmit}>
              Generate Trip
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateTrip;
