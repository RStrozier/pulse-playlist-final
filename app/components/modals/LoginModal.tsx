"use client";

import Image from "next/image";
import { Modal, Box, Fade, Backdrop } from "@mui/material";
import logo from "../../../public/final-logo-pulse-playlist.png";

export default function LoginModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const handleLogin = () => {
    onClose(); // Close the modal
    window.location.href = "/api/login"; // Redirect to Spotify login
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose} // Trigger the onClose callback when the modal is closed
      disableEscapeKeyDown // Prevent closing with Escape key
      closeAfterTransition // Ensures smooth fade-out
      BackdropComponent={Backdrop} // Use custom Backdrop
      BackdropProps={{
        timeout: 500,
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent black background
        },
      }}
    >
      <Fade in={isOpen} timeout={500}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Keeps the modal centered
            width: 400,
            bgcolor: "rgba(26, 26, 26, 0.85)",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            backdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Image
            src={logo}
            alt="Pulse Playlist Logo"
            width={300}
            height={100}
          />
          <button
            onClick={handleLogin}
            className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Login with Spotify
          </button>
          <div className="mt-3 mx-4 text-xs text-gray-300">
            Please Note: This site is currently under development. Only
            authorized users have access at this time.
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}