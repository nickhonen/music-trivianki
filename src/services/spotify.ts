import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import "dotenv/config";

const clientId = process.env.SPOTIFY_CLIENT_ID as string;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;
const playlistId: string = "1g2MxzFSWnS2Xz9b8fKAaW?si=2c4f6a8ff8f342c4";

const api = SpotifyApi.withClientCredentials(clientId, clientSecret);

const items = await api.search("The Beatles", ["artist"]);

const playlist = await api.playlists.getPlaylist(
  playlistId,
  undefined,
  "tracks",
  undefined
);
// const playlist = await api.playlists.getPlaylist("")
// console.table(
//   items.artists.items.map((item) => ({
//     name: item.name,
//     followers: item.followers.total,
//     popularity: item.popularity,
//   }))
// );

console.table(
  playlist.tracks.items.map((item) => ({
    name: item.track.name,
    artist: item.track.artists.map((artist) => artist.name).join(", "),
  }))
);
