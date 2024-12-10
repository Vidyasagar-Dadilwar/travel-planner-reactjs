import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { isSignedIn } = useAuth(); // Check if the user is signed in
  const { signOut } = useAuth(); // Clerk's sign-out function
  const { user } = useUser(); // Access user details (optional)

  return (
    <div className="p-3 shadow-sm px-5 flex items-center justify-between">
      <img src="/logo.svg" alt="logo" onClick={() => window.location.href = "/"} />
      {isSignedIn ? (
        <div className="flex items-center gap-3">

          <Button variant="default" onClick={() => window.location.href = "/my-trips"}>
            My Trips
          </Button>

          <Button
            variant="destructive"
            onClick={() => {
              signOut();
              window.location.href = "/"; 
            }}
          >
            Log Out
          </Button>
        </div>
      ) : (
        <Button onClick={() => window.location.href = "/create-trip"}>
          Sign in
        </Button>
      )}
    </div>
  );
};

export default Header;