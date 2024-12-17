"use client";

import React from "react";
import { UserDataProvider, useUserData } from "./context/UserDataContext";
import LoginModal from "./components/modals/LoginModal";
import LoadingIndicator from "./components/LoadingIndicator";
import SpotifyUserData from "./components/user/SpotifyUserDisplay";

const HomeContent = () => {
  const { accessToken, logout } = useUserData();

  if (!accessToken) {
    return (
      <LoginModal isOpen={true} onClose={() => console.log("Modal closed")} />
    );
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <SpotifyUserData />
    </div>
  );
};

const Home = () => {
  return (
    <UserDataProvider>
      <React.Suspense fallback={<LoadingIndicator />}>
        <HomeContent />
      </React.Suspense>
    </UserDataProvider>
  );
};

export default Home;