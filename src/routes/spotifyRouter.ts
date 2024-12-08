import { Router } from "express";
import * as spotifyService from "../services/spotify.js";

const router = Router();

export const TRIVIA_PLAYLIST_ID = "1g2MxzFSWnS2Xz9b8fKAaW?si=d0cdeeb0eeca4336";

router.get("/playlist-tracks/:playlistId", async (req, res) => {
  const playlistTracks = await spotifyService.getAllPlaylistTracks(
    req.params.playlistId
  );
  if (playlistTracks) {
    res.json(playlistTracks);
  }
});

router.get("/playlists/:playlistId", async (req, res) => {
  const playlist = await spotifyService.getPlaylistSongAndArtist(
    req.params.playlistId
  );
  if (playlist) {
    res.json(playlist);
  }
});

export default router;
