"use client";

import { useState } from 'react';
import moodData from '../../data/moods.json';
import moodDescriptions from '../../data/mood-descriptions.json';
import { Button, Tooltip } from '@mui/material';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { MoodKey } from '@/app/data/interfaces';
import { useMood } from '@/app/context/MoodContext';
import MoodDescription from './MoodDescription';
import { useToggle } from '@/app/context/ToggleContext';
import MoodAlert from '../alerts/MoodAlert';
import PulsePlaylistModal from '../modals/PulsePlaylistModal';

const moods = moodData.moods as MoodKey[];
const descriptions = moodDescriptions.moodDescriptions;
type MoodDescriptionKeys = keyof typeof descriptions;

const MoodSelector = () => {
    const { setSelectedMood } = useMood();
    const [selectedMood, setSelectedMoodState] = useState<MoodKey | null>(null);
    const { isExpanded, toggleExpand, showAlert } = useToggle();

    // State to manage modal visibility
    const [modalOpen, setModalOpen] = useState(false);

    const handleMoodSelect = (mood: MoodKey) => {
        setSelectedMoodState(mood);
    };

    const handleGeneratePlaylist = () => {
        if (selectedMood) {
            setSelectedMood(selectedMood);
            setModalOpen(true); // Open the modal when generating the playlist
        } else {
            showAlert();
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false); // Close the modal
    };

    return (
        <div className="text-center my-4 mx-2 shadow-lg">
            <div className="text-xl mb-2 text-gray-200 header-font">Select Your Mood</div>
            <MoodDescription />
            <div className="mini-spacer"></div>
            <div className="flex justify-center items-center py-2 px-2">
                <Button
                    onClick={toggleExpand}
                    className="flex items-center justify-center text-white font-bold py-2 px-4 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                    {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
                    <span className="ml-2 text-base">
                        {isExpanded ? 'Close Moods' : 'Select Mood'}
                    </span>
                </Button>
            </div>
            <div className="spacer"></div>

            {/* Full-page overlay for moods */}
            {isExpanded && (
                <div className="fixed inset-0 bg-gradient-to-b from-red-500 to-blue-500 z-50 flex flex-col items-center justify-center overflow-auto">
                    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                        {moods.map((mood) => (
                            <Tooltip
                                key={mood}
                                title={descriptions[mood as MoodDescriptionKeys]}
                                arrow
                                placement="top"
                            >
                                <Button
                                    variant="contained"
                                    className="bg-gray-700 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-red-500 hover:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-purple-300 focus:ring-offset-2"
                                    onClick={() => handleMoodSelect(mood)}
                                >
                                    {mood}
                                </Button>
                            </Tooltip>
                        ))}
                    </div>
                    <Button
                        variant="contained"
                        className="mt-4 p-4 mx-2"
                        onClick={() => toggleExpand()} // Close overlay when clicked
                    >
                        Confirm Mood
                    </Button>
                </div>
            )}

            {/* Selects mood and generates a pulse playlist */}
            <Button
                variant="contained"
                onClick={handleGeneratePlaylist}
                className="bg-red-500 hover:bg-red-600 text-white font-nunito font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all pulse-button"
            >
                Generate My<span className="mx-1 text-red-300">{selectedMood}</span>Playlist!
            </Button>

            <MoodAlert />
            <br />
            <div className="spacer"></div>
            <PulsePlaylistModal open={modalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default MoodSelector;