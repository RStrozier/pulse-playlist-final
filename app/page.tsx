"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import LoginModal from "./components/modals/LoginModal";
import LoadingIndicator from "./components/LoadingIndicator";

interface SpotifyUserData {
  display_name: string;
  images: { url: string }[];
}

const Home = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<SpotifyUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // New loading state

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
    const cookies = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("access_token="));
    const token = cookies ? cookies.split("=")[1] : null;

    if (token) {
      validateToken(token).then((isValid) => {
        if (isValid) {
          setAccessToken(token);
        } else {
          setAccessToken(null);
        }
        setLoading(false); // Stop loading regardless of token validity
      });
    } else {
      setAccessToken(null);
      setLoading(false); // Stop loading if no token is found
    }
  }, []);

  const fetchSpotifyData = useCallback(async () => {
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
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      fetchSpotifyData();
    }
  }, [accessToken, fetchSpotifyData]);

  const logout = () => {
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setAccessToken(null);
    setUserData(null);
    console.log("Logged out and cleared access token.");
  };

  if (loading) {
    // Show a loading indicator while validating the token or fetching data
    return (
      <LoadingIndicator />
    );
  }

  return (
    <div>
      {/* Show the main app content when there is an access token */}
      {accessToken ? (
        <div>
          <button onClick={logout}>Logout</button>
          {userData ? (
            <div>
              <h2>Welcome, {userData.display_name}</h2>
              <Image
                src={userData.images[0]?.url || "/default-profile.png"}
                alt="Profile"
                width={100}
                height={100}
              />
                 {/* <SpotifyUserDisplay />
                <MoodSelector />
                  <PulsePlaylist /> */}
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      ) : (
        // Show LoginModal when there is no access token
        <LoginModal isOpen={true} onClose={() => console.log("Modal closed")} />
      )}
    </div>
  );
};

export default Home;