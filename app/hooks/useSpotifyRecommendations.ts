"use client";

import { useState, useEffect } from 'react';

interface Artist {
  name: string;
}

interface Album {
  name: string;
  images: { url: string }[];
}

export interface Track {
  id: string;
  name: string;
  preview_url: string | null;
  artists: Artist[];
  album: Album;
}

const useSpotifyRecommendations = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading and hardcoded data
    setLoading(true);
    setError(null);

    setTimeout(() => {
      try {
        // Hardcoded data for testing
        const hardcodedTracks: Track[] = [
          {
            id: '1',
            name: 'Hardcoded Track 1',
            preview_url: 'https://p.scdn.co/mp3-preview/example1',
            artists: [{ name: 'Artist 1' }],
            album: {
              name: 'Album 1',
              images: [{ url: 'https://via.placeholder.com/150' }],
            },
          },
          {
            id: '2',
            name: 'Hardcoded Track 2',
            preview_url: 'https://p.scdn.co/mp3-preview/example2',
            artists: [{ name: 'Artist 2' }],
            album: {
              name: 'Album 2',
              images: [{ url: 'https://via.placeholder.com/150' }],
            },
          },
        ];

        setTracks(hardcodedTracks);
      } catch {
        setError('Failed to load recommendations');
      } finally {
        setLoading(false);
      }
    }, 1000); // Simulate network delay
  }, []);

  return { tracks, loading, error };
};

export default useSpotifyRecommendations;