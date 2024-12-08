# Music Trivianki Backend

## To Do

DONT OVER OPTIMIZE. Focus on the business logic/problems. The spotify API isn't even a huge part of the app.

- [x] get playlist logic separate from endpoint
- [x] Hookup Spotify API service to a route
- [x] getAllPlaylist endpoint works
- [x] optimize getAllPlaylist endpoint a bit but not too much, this isnt as important right now
- [ ] Should maybe start implementing testing with claude
- [x] figure out a way to get the route thing working (/playlists/:playlistId/tracks should work)
- [ ] Add Get playlist endpoint, make sure you can hit it through the main app. Should authenticate and stuff.
      (you dont have to use separate routers/services yet but you should be able to hit the api through the main app.)
- [ ] Add an integration test/unit test for the get playlist endpoint just so you know the flow.
- [ ] Add Spotify API
