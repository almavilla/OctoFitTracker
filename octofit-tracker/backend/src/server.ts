import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {
  activityRoutes,
  leaderboardRoutes,
  teamRoutes,
  userRoutes,
  workoutRoutes
} from './routes'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/teams', teamRoutes)
app.use('/api/activities', activityRoutes)
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/workouts', workoutRoutes)

const mongoUrl = process.env.MONGODB_URI || process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit_db'
const port = process.env.PORT ? Number(process.env.PORT) : 8000
const codespaceName = process.env.CODESPACE_NAME
export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

app.get('/', (_request, response) => {
  response.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    apiBaseUrl: API_BASE_URL,
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  })
})

const checkMongoConnection = async () => {
  try {
    await mongoose.connect(mongoUrl, { serverSelectionTimeoutMS: 5000 })
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection failed. Make sure MongoDB is running on port 27017.')
    console.error(error)
  }
}

app.listen(port, () => {
  console.log(`Backend running on port ${port}`)
  console.log(`API base URL: ${API_BASE_URL}`)
})

void checkMongoConnection()
