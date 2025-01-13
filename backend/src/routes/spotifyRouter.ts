import { Router } from 'express'
import * as spotifyService from '../spotify.js'

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
  const playlist = await spotifyService.getPlaylistUris(req.params.playlistId)
  if (playlist) {
    res.json(playlist)
  }
})

router.post('/player', async (req, res) => {
  // const playlistUris = await spotifyService.getPlaylistUris(TRIVIA_PLAYLIST_ID)
  const bodyUris = req.body.uris
  // same as { uris } = req.body;
  await spotifyService.startPlayback(bodyUris)
  res.status(200).json({ message: 'playback started' })
})

export default router
