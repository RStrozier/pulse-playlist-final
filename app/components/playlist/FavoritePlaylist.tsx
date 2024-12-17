"use client";

import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FavoritePlaylistModal from "../modals/FavoritePlaylistModal";

interface Playlist {
  id: string;
  name: string;
  songs: string[];
}

interface FavoritePlaylistProps {
  playlistId: string; // Pass the playlist ID
  songs: string[]; // Pass the songs array
  showButton?: boolean;
}

const FavoritePlaylist = ({
  playlistId,
  songs,
  showButton = true,
}: FavoritePlaylistProps) => {
  const [favoritePlaylists, setFavoritePlaylists] = useState<Playlist[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Logic to toggle favorite playlists
  const toggleFavoritePlaylist = (playlistId: string, songs: string[], playlistName: string) => {
    setFavoritePlaylists((prev) => {
      const existingPlaylist = prev.find((playlist) => playlist.id === playlistId);
      if (existingPlaylist) {
        return prev.filter((playlist) => playlist.id !== playlistId);
      } else {
        return [...prev, { id: playlistId, name: playlistName, songs }];
      }
    });
  };

  // Update `isFavorited` state whenever `favoritePlaylists` changes
  useEffect(() => {
    const isAlreadyFavorited = favoritePlaylists.some(
      (playlist) => playlist.id === playlistId
    );
    setIsFavorited(isAlreadyFavorited);
  }, [favoritePlaylists, playlistId]);

  const handleToggleFavorite = () => {
    if (isFavorited) {
      // If already favorited, remove it directly
      toggleFavoritePlaylist(playlistId, songs, ""); // Empty playlistName for removal
      setIsFavorited(false);
    } else {
      // Open modal to add playlist
      setModalOpen(true);
    }
  };

  const handleSave = (playlistName: string) => {
    // Add playlist to favorites with a name
    toggleFavoritePlaylist(playlistId, songs, playlistName);
    setIsFavorited(true); // Update state
    setModalOpen(false); // Close modal
  };

  return (
    <>
      {showButton && (
        <button onClick={handleToggleFavorite} className="focus:outline-none ml-2">
          {isFavorited ? (
            <div className="flex items-center">
              <span className="text-green-500">Added Playlist</span>
              <FaHeart className="text-red-500 ml-1" />
            </div>
          ) : (
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Add Playlist</span>
              <FaRegHeart className="text-gray-400 ml-1" />
            </div>
          )}
        </button>
      )}
      <FavoritePlaylistModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave} // Save the playlist with the name
      />
    </>
  );
};

export default FavoritePlaylist;