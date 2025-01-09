import { AccessToken, Playlist, SpotifyApi } from '@spotify/web-api-ts-sdk'
import 'dotenv/config'

const clientId = process.env.SPOTIFY_CLIENT_ID as string
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string
const redirectUri = process.env.REDIRECT_URI as string

// this should be gotten from the frontend
const accessToken: AccessToken = {
  access_token: process.env.OAUTH_ACCESS_TOKEN as string,
  token_type: 'Bearer',
  expires_in: 3600,
  refresh_token: process.env.OAUTH_REFRESH_TOKEN as string,
}
const scopes = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'streaming',
  'app-remote-control',
]

const spotifyApi: SpotifyApi = SpotifyApi.withClientCredentials(
  clientId,
  clientSecret
)

const spotifyApiAccessToken: SpotifyApi = SpotifyApi.withAccessToken(
  clientId,
  accessToken
)

const spotifyApiUserAuth: SpotifyApi = SpotifyApi.withUserAuthorization(
  clientId,
  redirectUri,
  scopes,
  undefined
)

// export function initializeSpotifyApi() {
//   if (spotifyApi === null) {
//     spotifyApi = SpotifyApi.withClientCredentials(clientId, clientSecret);
//   }
// }

const items = await spotifyApi.search('The Beatles', ['artist'])

// This is where you would write the type in another file.
export const getPlaylistSongAndArtist = async (
  playlistId: string
): Promise<Object[]> => {
  try {
    const response = await spotifyApi.playlists.getPlaylist(
      playlistId,
      undefined,
      'tracks(',
      undefined
    )
    const result = response.tracks.items.map((track) => ({
      name: track.track.name,
      artist: track.track.artists.map((artist) => artist.name).join(', '),
    }))
    console.table(result)
    return result
  } catch (error) {
    throw new Error(`Error fetching playlist in service layer: ${error}`)
  }
}

export const getPlaylistUris = async (
  playlistId: string
): Promise<string[]> => {
  try {
    const response = await spotifyApi.playlists.getPlaylist(
      playlistId,
      undefined,
      'tracks(',
      undefined
    )
    const result = response.tracks.items.map((track) => track.track.uri)
    return result
  } catch (error) {
    throw new Error(`Error fetching playlist uris in service layer: ${error}`)
  }
}

// Doing this to get all tracks in a playlist and get around spotify limit. Might
// separate out the offset logic.
export const getAllPlaylistTracks = async (
  playlistId: string
  // also need to add type here with my limited fields, or just dont limit fields
) => {
  let offset = 0
  let allTracks = []

  try {
    while (true) {
      // possible bug, if someone puts in a playlist with EpisodeObjects instead of TrackObjects
      const response = await spotifyApi.playlists.getPlaylistItems(
        playlistId,
        undefined,
        'items(track(name,uri,artists(name))),total',
        50,
        offset
      )
      allTracks.push(...response.items)

      if (response.items.length < 50) break
      offset += 50
    }
    return allTracks
  } catch (error) {
    throw new Error(`Error in getAllPlaylistTracks: ${error}`)
  }
}

export const startPlayback = async (uris: string[]) => {
  try {
    console.log(spotifyApiAccessToken.player.startResumePlayback)
    await spotifyApiAccessToken.player.startResumePlayback(
      '0622fb5c01b5410423df29adc33e635ebe7d8a2f',
      undefined,
      uris
    )
  } catch (e) {
    throw new Error(`player aint working: ${e}`)
  }
}
