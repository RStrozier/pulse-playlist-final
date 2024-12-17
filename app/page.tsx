"use client";

import React from "react";
import { UserDataProvider, useUserData } from "./context/UserDataContext";
import LoginModal from "./components/modals/LoginModal";
import LoadingIndicator from "./components/LoadingIndicator";
import SpotifyUserData from "./components/user/SpotifyUserDisplay";
import { MoodProvider } from "./context/MoodContext";
import { ToggleProvider } from "./context/ToggleContext";
import MoodSelector from "./components/mood/MoodSelector";
import PulsePlaylist from "./components/playlist/PulsePlaylist";

const HomeContent = () => {
  const { accessToken } = useUserData();

  if (!accessToken) {
    return (
      <LoginModal isOpen={true} onClose={() => console.log("Modal closed")} />
    );
  }

  return (
    <div>
      <SpotifyUserData />
      <MoodSelector />
      <PulsePlaylist />
    </div>
  );
};

const Home = () => {
  return (
    <UserDataProvider>
      <MoodProvider>
        <ToggleProvider>
          <React.Suspense fallback={<LoadingIndicator />}>
            <HomeContent />
          </React.Suspense>
        </ToggleProvider>
      </MoodProvider>
    </UserDataProvider>
  );
};

export default Home;