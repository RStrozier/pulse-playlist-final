"use client";

import React, { useEffect, useState } from "react";
import LoginModal from "./components/modals/LoginModal";

const Home = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  // Function to validate the access token
  const validateToken = async (token: string) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log("Access token is valid.");
        return true;
      } else {
        console.error("Invalid access token, clearing state.");
        return false;
      }
    } catch (error) {
      console.error("Error validating access token:", error);
      return false;
    }
  };

  useEffect(() => {
    // Retrieve access token from cookies
    const cookies = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("access_token="));
    const token = cookies ? cookies.split("=")[1] : null;

    if (token) {
      validateToken(token).then((isValid) => {
        if (isValid) {
          setAccessToken(token);
        } else {
          setAccessToken(null); // Clear token if invalid
        }
      });
    } else {
      setAccessToken(null); // No token found
      setModalOpen(true); // Show the login modal
    }
  }, []);

  // Automatically fetch Spotify data when accessToken is set
  useEffect(() => {
    if (accessToken) {
      fetchSpotifyData();
    }
  }, [accessToken]); // Runs whenever accessToken changes

  const fetchSpotifyData = async () => {
    if (!accessToken) {
      console.error("No access token available for fetching data.");
      return;
    }

    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        console.error("Failed to fetch Spotify data:", response.statusText);
        return;
      }
      const data = await response.json();
      console.log("Spotify User Data:", data);
      setUserData(data);
    } catch (error) {
      console.error("Failed to fetch Spotify data:", error);
    }
  };

  const logout = () => {
    // Clear the access_token cookie and reset state
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setAccessToken(null);
    setUserData(null);
    setModalOpen(true); // Show the login modal after logout
    console.log("Logged out and cleared access token.");
  };

  return (
    <div>
      {/* Show LoginModal when there is no access token */}
      {!accessToken && (
        <LoginModal isOpen={true} onClose={() => setModalOpen(false)} />
      )}
  
      {/* Show the main app content when there is an access token */}
      {accessToken && (
        <div>
          <button onClick={logout}>Logout</button>
          {userData && (
            <div>
              <h2>Welcome, {userData.display_name}</h2>
              <img src={userData.images[0]?.url} alt="Profile" width={100} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;