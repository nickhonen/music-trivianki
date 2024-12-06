import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import "dotenv/config";

const clientId = process.env.SPOTIFY_CLIENT_ID as string;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;

const api = SpotifyApi.withClientCredentials(clientId, clientSecret);

const items = await api.search("The Beatles", ["artist"]);

// const playlist = await api.playlists.getPlaylist("")
console.table(
  items.artists.items.map((item) => ({
    name: item.name,
    followers: item.followers.total,
    popularity: item.popularity,
  }))
);
