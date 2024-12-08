import { Playlist, SpotifyApi } from "@spotify/web-api-ts-sdk";
import "dotenv/config";

const clientId = process.env.SPOTIFY_CLIENT_ID as string;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;
const playlistId: string = "1g2MxzFSWnS2Xz9b8fKAaW?si=2c4f6a8ff8f342c4";

const spotifyApi: SpotifyApi = SpotifyApi.withClientCredentials(
  clientId,
  clientSecret
);

// export function initializeSpotifyApi() {
//   if (spotifyApi === null) {
//     spotifyApi = SpotifyApi.withClientCredentials(clientId, clientSecret);
//   }
// }

const items = await spotifyApi.search("The Beatles", ["artist"]);

// This is where you would write the type in another file.
export const getPlaylistSongAndArtist = async (
  playlistId: string
): Promise<Object[]> => {
  try {
    const response = await spotifyApi.playlists.getPlaylist(
      playlistId,
      undefined,
      "tracks(",
      undefined
    );
    const result = response.tracks.items.map((track) => ({
      name: track.track.name,
      artist: track.track.artists.map((artist) => artist.name).join(", "),
    }));
    console.table(result);
    return result;
  } catch (error) {
    throw new Error(`Error fetching playlist in service layer: ${error}`);
  }
};

// Doing this to get all tracks in a playlist and get around spotify limit. Might
// separate out the offset logic.
export const getAllPlaylistTracks = async (
  playlistId: string
  // also need to add type here with my limited fields, or just dont limit fields
) => {
  let offset = 0;
  let allTracks = [];
  console.log("proof this is getting called");

  try {
    while (true) {
      // possible bug, if someone puts in a playlist with EpisodeObjects instead of TrackObjects
      const response = await spotifyApi.playlists.getPlaylistItems(
        playlistId,
        undefined,
        "items(track(name,artists(name))),total",
        50,
        offset
      );
      allTracks.push(...response.items);

      if (response.items.length < 50) break;
      offset += 50;
    }
    return allTracks;
  } catch (error) {
    throw new Error(`Error in getAllPlaylistTracks: ${error}`);
  }
};

// console.table(
//   items.artists.items.map((item) => ({
//     name: item.name,
//     followers: item.followers.total,
//     popularity: item.popularity,
//   }))
// );
