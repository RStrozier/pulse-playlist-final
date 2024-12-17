"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SpotifyUserData {
  display_name: string;
  images: { url: string }[];
  email?: string;
}

interface UserDataContextType {
  userData: SpotifyUserData | null;
  setUserData: React.Dispatch<React.SetStateAction<SpotifyUserData | null>>;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  logout: () => void; // Add logout function
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<SpotifyUserData | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Function to validate the access token
  const validateToken = async (token: string) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.ok;
    } catch (error) {
      console.error("Error validating access token:", error);
      return false;
    }
  };

  // Fetch Spotify user data
  const fetchSpotifyData = async (token: string) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.error("Failed to fetch Spotify user data");
        return null;
      }
      const data = await response.json();
      setUserData({
        display_name: data.display_name,
        images: data.images,
        email: data.email,
      });
    } catch (error) {
      console.error("Error fetching Spotify user data:", error);
    }
  };

  // Logout function to clear access token and user data
  const logout = () => {
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setAccessToken(null);
    setUserData(null);
    console.log("Logged out and cleared access token.");
  };

  useEffect(() => {
    // Get the access token from cookies
    const cookies = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("access_token="));
    const token = cookies ? cookies.split("=")[1] : null;

    if (token) {
      validateToken(token).then((isValid) => {
        if (isValid) {
          setAccessToken(token);
          fetchSpotifyData(token);
        } else {
          setAccessToken(null);
        }
      });
    }
  }, []);

  return (
    <UserDataContext.Provider
      value={{ userData, setUserData, accessToken, setAccessToken, logout }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = (): UserDataContextType => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};