import { Router } from 'express'
import * as spotifyService from '../services/spotify.js'

const router = Router()

const TRIVIA_PLAYLIST_ID = process.env.TRIVIA_PLAYLIST_ID!

router.get('/playlists/:playlistId/tracks', async (req, res) => {
  const playlistTracks = await spotifyService.getAllPlaylistTracks(
    req.params.playlistId
  )
  if (playlistTracks) {
    res.json(playlistTracks)
  }
})

router.get('/playlists/:playlistId', async (req, res) => {
  const playlist = await spotifyService.getPlaylistSongAndArtist(
    req.params.playlistId
  )
  if (playlist) {
    res.json(playlist)
  }
})

export default router
