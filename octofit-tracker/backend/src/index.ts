import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit'
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`)
  })
}

const checkMongoConnection = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      serverSelectionTimeoutMS: 5000
    })
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection failed. Make sure MongoDB is running on port 27017.')
    console.error(error)
  }
}

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  })
})

void checkMongoConnection()
startServer()
