import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config() // Load .env into process.env

const PORT = Number(process.env.PORT ?? 3000)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    credentials: true,
  })
)
app.use(compression())
app.use(cookieParser())

app.get('/', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }))

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/`)
})

process.on('SIGTERM', () => {
  console.info('SIGTERM received: closing HTTP server')
  server.close(() => process.exit(0))
})

