import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './create-trip/index.jsx';
import Header from './components/custom/Header.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import ViewTrip from './view-trips/[tripId]/index.jsx';
import MyTrips from './components/custom/MyTrips.jsx';
import { Analytics } from "@vercel/analytics/react"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/create-trip",
    element: <CreateTrip />
  },
  {
    // adding dynamic route 
    path: "/view-trips/:tripId",
    element: <ViewTrip />
  },
  {
    path: "/my-trips",
    element: <MyTrips />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Analytics />
    <ClerkProvider publishableKey='pk_test_Z2VuZXJvdXMtc2t1bmstNTcuY2xlcmsuYWNjb3VudHMuZGV2JA'>
      <Header />
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)
