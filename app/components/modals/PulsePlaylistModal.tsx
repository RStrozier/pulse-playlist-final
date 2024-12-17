"use client";

import { Button, Collapse, Modal, Box } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';

import { useSpotifyRecommendations } from '@/app/hooks/useSpotifyReccommendations';
import FavoritePlaylist from '../playlist/FavoritePlaylist';
import UserSelection from '../user/UserSelection';
import FavoriteSong from '../user/FavoriteSong';

export interface PulsePlaylistModalProps {
    open: boolean;
    onClose: () => void;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',  
    maxHeight: '80%', 
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto', 
};

const PulsePlaylistModal: React.FC<PulsePlaylistModalProps> = ({ open, onClose }) => {
    const { tracks, loading, error } = useSpotifyRecommendations();
    const [showPreviews, setShowPreviews] = useState<boolean>(false);
    const playlistId = 'pulse-playlist';

    const handleTogglePreviews = () => {
        setShowPreviews(prev => !prev);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <AiOutlineClose 
                    className="text-gray-800 cursor-pointer" 
                    size={24} 
                    onClick={onClose}
                />

                {loading ? (
                    <p className="text-center text-gray-700">Loading tracks...</p>
                ) : error ? (
                    <p className="text-center text-red-500">Error: {error}</p>
                ) : (
                    <>
                        <Collapse in={showPreviews}>
                            <div className="mt-4 p-4 bg-gray-100 rounded-md">
                                <h4 className="font-semibold default-roboto text-lg mb-3 text-gray-800">Track Previews</h4>
                                <div className="spacer"></div>
                                {tracks.map((track) => (
                                    track.preview_url && (
                                        <div key={track.id} className="flex items-center mb-2">
                                            <div className="text-sm flex-1 text-gray-800">
                                                {track.name}
                                                <br />
                                                <span className='text-gray-500'>
                                                    {track.artists.map((artist) => artist.name).join(', ')}
                                                </span>
                                            </div>
                                            <audio controls className="w-1/2">
                                                <source src={track.preview_url} type="audio/mpeg" />
                                                Your browser does not support the audio element.
                                            </audio>
                                        </div>
                                    )
                                ))}
                            </div>
                        </Collapse>

                        <UserSelection />
                        <div className="mini-spacer"></div>
                        <div className="flex justify-between items-center mt-2 mb-2">
                            <FavoritePlaylist
                                playlistId={playlistId}
                                songs={tracks.map(track => track.id)}
                                showButton={true} />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleTogglePreviews}
                                className="ml-4"
                            >
                                {showPreviews ? 'Hide Track Previews' : 'Show Track Previews'}
                            </Button>
                        </div>
                        <ul className="space-y-4">
                            {tracks.map((track) => (
                                <li key={track.id} className="flex flex-col p-4 bg-white rounded-md shadow hover:shadow-lg transition">
                                    <div className="flex items-center">
                                        <img
                                            src={track.album.images[0]?.url}
                                            alt={track.album.name}
                                            className="w-16 h-16 rounded-md object-cover mr-4" />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg text-gray-900">{track.name}</h3>
                                            <div className="text-sm text-gray-600">
                                                {track.artists.map((artist) => artist.name).join(', ')}
                                            </div>
                                            <div className="text-xs text-gray-500">{track.album.name}</div>
                                        </div>
                                        <FavoriteSong trackId={track.id} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default PulsePlaylistModal;