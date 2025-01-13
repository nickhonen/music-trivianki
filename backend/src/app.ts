import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import spotifyRouter from './routes/spotifyRouter.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/ping', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
})

app.get('/', (_req, res) => {
  res.send('hello world')
})

app.use('/api/spotify', spotifyRouter)

export { app }
