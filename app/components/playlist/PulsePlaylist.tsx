"use client";

import { useState } from "react";
import PulsePlaylistModal from "../modals/PulsePlaylistModal";
import PulsePlaylistMessage from "./PulsePlaylistMessage";
import { useSpotifyRecommendations } from "@/app/hooks/useSpotifyReccommendations";

const PulsePlaylist = () => {
    // Pulling in the custom Spotify hook
    const { tracks, loading } = useSpotifyRecommendations();
    const [modalOpen, setModalOpen] = useState(false);

    // Function to close the modal
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <><div className="h-1 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900"></div><div className="text-center">
            {/* Handle loading, error, and tracks state */}
            {loading ? (
                <p>Loading tracks...</p>
            ) : tracks.length > 0 ? (
                <>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="btn-primary"
                        aria-label="View Playlist Modal"
                    >
                        View Playlist
                    </button>
                    <PulsePlaylistModal open={modalOpen} onClose={handleCloseModal} />
                </>
            ) : (
                <>
                    {/* Display the PulsePlaylistMessage */}
                    <PulsePlaylistMessage />
                </>
            )}
        </div></>
    );
};

export default PulsePlaylist;