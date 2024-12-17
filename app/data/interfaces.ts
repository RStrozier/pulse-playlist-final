export interface LoginFromModalProps {
    open: boolean;
    onClose: () => void;
}

// mood context
export type MoodKey = 'Happy' | 'Sad' | 'Energetic' | 'Relaxed' | 'Angry' | 'Anxious' | 'Bored' |
    'Confident' | 'Disappointed' | 'Excited' | 'Frustrated' | 'Grateful' |
    'Hopeful' | 'Inspired' | 'Lonely' | 'Nostalgic' | 'Overwhelmed' |
    'Proud' | 'Relieved' | 'Surprised' | 'Tired' | 'Worried' |
    'Curious' | 'Content' | 'Playful' | 'Determined';

export interface MoodContextType {
    selectedMood: MoodKey | null;
    setSelectedMood: (mood: MoodKey | null) => void;
}

// context 
export interface Playlist {
    id: string;
    name: string;
    songs: string[];
}

export interface FavoritesContextType {
    favoritePlaylists: Playlist[];
    toggleFavoritePlaylist: (playlistId: string, songs: string[], playlistName: string) => void;
    toggleFavoriteSong: (playlistId: string, songId: string) => void;
}

export interface ToggleContextType {
    isExpanded: boolean;
    alertOpen: boolean;
    toggleExpand: () => void;
    handleAlertOpen: () => void; 
    handleAlertClose: () => void;
    showAlert: () => void;
}

// Define the shape of the user data
export interface UserData {
    display_name: string;
    email: string;
    images?: { url: string }[]; // Optional `images` field
  }
  
  // Define the type for the context
  export interface UserDataContextType {
    userData: UserData | null;
    setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
    loading: boolean;
  }

// modal context
export interface FavoritePlaylistModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (playlistName: string) => void;
}

export interface TestingModalProps {
    alertOpen: boolean;
    handleAlertClose: () => void;
}

// favorite modal context
export interface Playlist {
    id: string;
    name: string; 
    songs: string[];
}

export interface FavoritesContextType {
    favoritePlaylists: Playlist[]; // Array of playlists with their songs and names
    toggleFavoritePlaylist: (playlistId: string, songs: string[], playlistName: string) => void; // Updated function signature
    toggleFavoriteSong: (playlistId: string, songId: string) => void;
}

// mood mapping
export type MoodMapping = {
    [key: string]: string[];
};

// alert props
export interface CustomAlertProps {
    open: boolean;
    message: string;
    onClose: () => void;
  }

// component props
export interface TopTrack {
    name: string;
    artists: { name: string }[];
  }

  export interface Artist {
    name: string;
}

export interface Album {
    name: string;
    images: { url: string }[]; // Assuming images is an array
}

export interface Track {
    id: string;
    name: string;
    artists: Artist[];
    album: Album;
    preview_url?: string; // Optional if a track might not have a preview
}