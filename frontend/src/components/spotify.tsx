import { useEffect, useState } from "react";
import { SpotifyApi, SearchResults } from "@spotify/web-api-ts-sdk";
import { useSpotify } from "@/hooks/useSpotify";

function SpotifyTest() {
  const sdk = useSpotify(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID as string,
    import.meta.env.VITE_SPOTIFY_REDIRECT_URI as string,
    // scopes, should get from userDetails
    [
      "user-read-playback-state",
      "user-modify-playback-state",
      "streaming",
      "app-remote-control",
    ]
  );
  return sdk ? <SpotifySearch sdk={sdk} /> : <div>Not authed boi</div>;
}

function SpotifySearch({ sdk }: { sdk: SpotifyApi }) {
  const [results, setResults] = useState<SearchResults<["artist"]>>(
    {} as SearchResults<["artist"]>
  );

  useEffect(() => {
    (async () => {
      const results = await sdk.search("The Beatles", ["artist"]);
      setResults(() => results);
    })();
  }, [sdk]);

  // generate a table for the results
  const tableRows = results.artists?.items.map((artist) => {
    return (
      <tr key={artist.id}>
        <td>{artist.name}</td>
        <td>{artist.popularity}</td>
        <td>{artist.followers.total}</td>
      </tr>
    );
  });

  return (
    <>
      <h1>Spotify Search for The Beatles</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Popularity</th>
            <th>Followers</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </>
  );
}

export default SpotifyTest;
