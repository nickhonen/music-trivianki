import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app.ts'

describe('Ping Endpoint', () => {
  it('GET /ping returns success', async () => {
    const res = await request(app).get('/ping').expect(200)
    expect(res.body).toBeDefined()
    expect(res.body.status).toBe('ok')
  })
})

describe('Get Playlist Endpoint', () => {
  it('GET /api/spotify/playlists/:playlistId returns success', async () => {
    const res = await request(app)
      .get('/api/spotify/playlists/1g2MxzFSWnS2Xz9b8fKAaW')
      .expect(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].name).toEqual('Uptown Girl')
  })
})
