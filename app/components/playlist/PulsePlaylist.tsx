"use client";

import { useState } from "react";
import PulsePlaylistModal from "../modals/PulsePlaylistModal";
import PulsePlaylistMessage from "./PulsePlaylistMessage";
import useSpotifyRecommendations from "@/app/hooks/useSpotifyRecommendations";
import LoadingIndicator from "../LoadingIndicator";

const PulsePlaylist = () => {
    // Pulling in the custom Spotify hook HARDCODED FOR NOW
    const { tracks, loading } = useSpotifyRecommendations();
    const [modalOpen, setModalOpen] = useState(false);

    // Function to close the modal
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div className="h-1 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900"></div>
            <div className="text-center">
                <PulsePlaylistMessage />
                {/* Show loading spinner/message */}
                {loading && (
                    <LoadingIndicator />
                )}

                {/* Show the playlist modal button if tracks are available */}
                {!loading && tracks.length > 0 && (
                    <PulsePlaylistModal open={modalOpen} onClose={handleCloseModal} />
                )}
            </div>
        </>
    );
};

export default PulsePlaylist;