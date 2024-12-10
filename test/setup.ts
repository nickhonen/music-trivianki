// import { beforeAll, afterAll, beforeEach } from 'vitest'
// import { testDb } from '../src/db'

// beforeAll(async () => {
//   await testDb.run('PRAGMA foreign_keys = ON')
// })

// beforeEach(async () => {
//   // Clear tables
//   await testDb.run('DELETE FROM playlists')
//   await testDb.run('DELETE FROM users')

//   // Basic seed data
//   await testDb.run(`
//     INSERT INTO users (id, username) VALUES
//     ('1', 'testuser');
//     INSERT INTO playlists (id, name, user_id) VALUES
//     ('1', 'Test Playlist', '1');
//   `)
// })

// afterAll(async () => {
//   await testDb.close()
// })
