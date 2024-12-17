import { useEffect, useState } from "react";
import { useMood } from "../context/MoodContext";
import moodMappingJson from "../data/mood-mapping.json";
import { MoodMapping, Track } from "../data/interfaces";
import { useUserData } from "../context/UserDataContext";

const moodMapping: MoodMapping = moodMappingJson.moodMappings;

export const useSpotifyRecommendations = () => {
  const { selectedMood } = useMood();
  const { accessToken } = useUserData();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedMood) {
      console.log("No mood selected. Waiting for user to select a mood.");
      return;
    }

    if (!accessToken) {
      console.error("Access token is missing or invalid!");
      setError("Access token is missing or invalid.");
      return;
    }

    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      setTracks([]);

      // Get genres based on the selected mood
      const genres = moodMapping[selectedMood] || [];
      if (!genres.length) {
        console.error(`No genres mapped for the selected mood: "${selectedMood}".`);
        setError(`No genres available for the selected mood: "${selectedMood}".`);
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching recommendations for mood:", selectedMood);

        // Spotify API only accepts up to 5 seeds in total
        const seedGenres = genres.slice(0, 2).join(","); // Use up to 2 genres
        const seedArtists = "4NHQUGzhtTLFvgF5SZesLK"; // Example artist ID
        const seedTracks = "0c6xIDDpzE81m2q797ordA"; // Example track ID

        const queryParams = new URLSearchParams({
          seed_genres: seedGenres,
          seed_artists: seedArtists,
          seed_tracks: seedTracks,
          limit: "20",
        });

        const response = await fetch(
          `https://api.spotify.com/v1/recommendations?${queryParams.toString()}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Spotify API error response:", errorText);
          throw new Error(`Failed to fetch recommendations: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.tracks || !data.tracks.length) {
          throw new Error("No tracks found for the selected mood and seeds.");
        }

        console.log("Fetched tracks:", data.tracks);
        setTracks(data.tracks);
      } catch (err) {
        console.error("Error fetching Spotify recommendations:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [selectedMood, accessToken]);

  return { tracks, loading, error };
};