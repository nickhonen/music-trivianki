import { useState } from "react";
import { useSpotify } from "../hooks/useSpotify";
import { Play, Pause } from "lucide-react"; // Import both Play and Pause icons
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const PlayButton = ({ uris }: { uris: string[] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const sdk = useSpotify(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID as string,
    import.meta.env.VITE_SPOTIFY_REDIRECT_URI as string,
    ["user-modify-playback-state"]
  );

  const getAccess = async (sdkParam: SpotifyApi) => {
    const token = await sdkParam.getAccessToken().then((token) => {
      if (token) {
        console.log(token);
        return token;
      } else {
        console.error("No access token");
      }
    });
    return token;
  };

  const handlePlay = async () => {
    if (!sdk) {
      console.error("Spotify SDK not initialized");
      return;
    }

    try {
      const token = await getAccess(sdk);

      const response = await fetch("http://localhost:3000/api/spotify/player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uris }),
      });

      if (response.ok) {
        setIsPlaying(true);
        console.log("Playback started successfully");
      } else {
        console.error("Failed to start playback");
      }
    } catch (error) {
      console.error("Error starting playback:", error);
    }
  };

  return (
    <button
      onClick={handlePlay}
      disabled={!sdk || isPlaying}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px", // Add some spacing between the icon and text
        padding: "8px 16px",
        backgroundColor: isPlaying ? "#1DB954" : "#1ED760", // Spotify green
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {isPlaying ? <Pause size={16} /> : <Play size={16} />}{" "}
      {/* Toggle between Play and Pause icons */}
      {isPlaying ? "Playing..." : "Play"}
    </button>
  );
};

export default PlayButton;
