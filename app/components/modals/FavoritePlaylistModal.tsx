import { useState } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';
import moodWords from '../../data/mood-word-generator.json';
import { FavoritePlaylistModalProps } from '@/app/data/interfaces';
import { useMood } from '@/app/context/MoodContext';
import CustomAlert from '../alerts/CustomAlert';

export const favoritePlaylistModalStyle = {
    position: 'absolute' as 'const',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const FavoritePlaylistModal = ({ open, onClose, onSave }: FavoritePlaylistModalProps) => {
    const [playlistName, setPlaylistName] = useState('');
    const { selectedMood } = useMood();
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const handleSave = () => {
        if (playlistName.trim()) {
            onSave(playlistName);
            onClose();
        } else {
            setAlertMessage("Please create a unique playlist name and try again.");
            setAlertOpen(true);
        }
    };

    const generateRandomPlaylistName = () => {
        if (selectedMood && moodWords.moods[selectedMood]) {
            const words = moodWords.moods[selectedMood];
            const randomWord1 = words[Math.floor(Math.random() * words.length)];
            const randomWord2 = words[Math.floor(Math.random() * words.length)];
            setPlaylistName(`${randomWord1} ${randomWord2} Playlist`);
        } else {
            setAlertMessage("No mood selected or mood not found!");
            setAlertOpen(true);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={favoritePlaylistModalStyle}>
                <h2 className='text-gray-700 text-center text-xl header-font'>Add Playlist</h2>
                <div className="text-gray-800 text-sm text-center my-2 default-roboto mx-2">This playlist will be saved
                    to your favorites and
                    added to your My Playlist tab.
                </div>
                <Button
                    onClick={generateRandomPlaylistName}
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, width: "100%", mb: 1 }}
                >
                    <span className='default-font'>Random Mood Playlist Name</span>
                </Button>
                <br />
                <div className="spacer"></div>
                <TextField
                    label="Playlist Name"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    fullWidth
                />

                <div className="spacer"></div>
                <Button
                    sx={{ bgcolor: 'green' }}
                    onClick={handleSave}
                    variant="contained"
                    className="green-button"
                >
                    <span className='default-text'>Save and Manage Playlists</span>
                </Button>

                <Button onClick={handleSave} variant="contained" color="primary" sx={{ mt: 1.5, width: "100%" }}>
                    <span className='default-text'>Save Playlist</span>
                </Button>
            {/* if the user clicks save with no playlist the alert will trigger */}
                <CustomAlert open={alertOpen} message={alertMessage} onClose={handleAlertClose} />
            </Box>
        </Modal>
    );
};

export default FavoritePlaylistModal;