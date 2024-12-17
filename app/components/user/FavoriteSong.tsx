"use client";

import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface FavoriteSongProps {
    trackId: string;
}

const FavoriteSong = ({ trackId }: FavoriteSongProps) => {
    const [isFavorited, setIsFavorited] = useState<boolean>(false);

    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
        // Here you could also save the favorite state to localStorage or a backend
        console.log(`Track ${trackId} favorited: ${!isFavorited}`);
    };

    return (
        <button onClick={toggleFavorite} className="focus:outline-none ml-2">
            {isFavorited ? (
                <FaHeart className="text-red-500" />
            ) : (
                <FaRegHeart className="text-gray-400" />
            )}
        </button>
    );
};

export default FavoriteSong;