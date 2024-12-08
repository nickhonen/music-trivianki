import { Router } from "express";
import * as spotifyService from "../services/spotify.js";

const router = Router();

router.get("/playlists/:playlistId", async (req, res) => {
  const playlist = await spotifyService.getPlaylistSongAndArtist(
    req.params.playlistId
  );
  if (playlist) {
    res.json(playlist);
  }
});

export default router;
