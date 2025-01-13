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

## Example Prompts

I am making the backend for a music trivia app using Node.js version 23, Express, and TypeScript.
I am creating a RESTful API that hits the Spotify API using the Spotify SDK and will allow me to 
retrieve a playlist and play that song's tracks for a user. The database is SQlite and I am using 
DrizzleORM as the ORM.

I would like to create a simple testing framework for this application. Ideally, it allows me to 
test the API endpoints, see if I am properly returning expected data, and maybe doing database tests
later. I'm not sure if I need a testing framework or if I can use the node js runner, but 
if I do I dont want to use jest. I most likely want to use supertest for the API testing unless I can't
use it with ES6 imports/exports and typescript.

Can you help me with that?

