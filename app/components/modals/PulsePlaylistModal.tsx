"use client";

import { Button, Collapse, Modal, Box } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import FavoritePlaylist from "../playlist/FavoritePlaylist";
import UserSelection from "../user/UserSelection";
import FavoriteSong from "../user/FavoriteSong";
import { PulsePlaylistModalProps, Track } from "@/app/data/interfaces";
import { PulsePlaylistModalstyle } from "@/app/data/styles";
import useSpotifyRecommendations from "@/app/hooks/useSpotifyRecommendations";
interface Props {
  open: boolean;
  onClose: () => void;
  tracks?: Track[]; // Make tracks optional
  loading: boolean;
  error: string | null;
}

const PulsePlaylistModal = ({
 open, onClose
}: PulsePlaylistModalProps) => {
  const [showPreviews, setShowPreviews] = useState<boolean>(false);
  const { tracks, loading } = useSpotifyRecommendations();

  const saveGeneratePlaylist = () => {
    console.log("Generate Playlist Button Clicked");
    console.log("Tracks:", tracks);
    alert('Playlist Saved! Check "My Playlist" for more details.');
  };

  // Utility function to safely map tracks
  const renderTracks = () =>
    tracks.map((track) => (
      <li
        key={track.id}
        className="flex flex-col p-4 bg-white rounded-md shadow hover:shadow-lg transition"
      >
        <div className="flex items-center">
          <img
            src={track.album.images[0]?.url}
            alt={track.album.name}
            className="w-16 h-16 rounded-md object-cover mr-4"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{track.name}</h3>
            <div className="text-sm text-gray-600">
              {track.artists.map((artist: { name: any; }) => artist.name).join(", ")}
            </div>
            <div className="text-xs text-gray-500">{track.album.name}</div>
          </div>
          <FavoriteSong trackId={track.id} />
        </div>
      </li>
    ));

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={PulsePlaylistModalstyle}>
        <AiOutlineClose
          className="text-gray-800 cursor-pointer"
          size={24}
          onClick={onClose}
        />

        {/* Conditional rendering based on loading and error */}
        {loading ? (
          <p className="text-center text-gray-700">Loading tracks...</p>
        ) : (
          <>
            <Collapse in={showPreviews}>
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <h4 className="font-semibold default-roboto text-lg mb-3 text-gray-800">
                  Track Previews
                </h4>
                <div className="spacer"></div>
                {tracks.length > 0 ? (
                  tracks.map(
                    (track) =>
                      track.preview_url && (
                        <div key={track.id} className="flex items-center mb-2">
                          <div className="text-sm flex-1 text-gray-800">
                            {track.name}
                            <br />
                            <span className="text-gray-500">
                              {track.artists
                                .map((artist: { name: any; }) => artist.name)
                                .join(", ")}
                            </span>
                          </div>
                          <audio controls className="w-1/2">
                            <source
                              src={track.preview_url}
                              type="audio/mpeg"
                            />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      )
                  )
                ) : (
                  <p className="text-gray-500">No tracks available</p>
                )}
              </div>
            </Collapse>

            <UserSelection />
            <div className="mini-spacer"></div>
            <div className="flex justify-between items-center mt-2 mb-2">
              <FavoritePlaylist
                playlistId="pulse-playlist"
                songs={tracks.map((track) => track.id)}
                showButton={true}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowPreviews((prev) => !prev)}
                className="ml-4"
              >
                {showPreviews ? "Hide Track Previews" : "Show Track Previews"}
              </Button>
            </div>

            <ul className="space-y-4">
              {tracks.length > 0 ? renderTracks() : <div className="text-gray-900">No tracks available.</div>}
            </ul>
          </>
        )}
        <br />

        <Button
          variant="contained"
          color="primary"
          onClick={saveGeneratePlaylist}
          className="mt-4 centered"
        >
          Save Playlist
        </Button>
      </Box>
    </Modal>
  );
};

export default PulsePlaylistModal;