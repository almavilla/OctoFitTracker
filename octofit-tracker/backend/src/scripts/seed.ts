import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout
} from '../models'

dotenv.config()

const connectionString = process.env.MONGODB_URI || process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit_db'

/**
 * Replaces the five application collections with linked test data for users,
 * teams, activities, leaderboard entries, and workout recommendations.
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString, { serverSelectionTimeoutMS: 5000 })

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({})
    ])

    const users = await User.create([
      { name: 'Alex Morgan', email: 'alex@example.com', goal: 'Build endurance' },
      { name: 'Jamie Lee', email: 'jamie@example.com', goal: 'Improve strength' },
      { name: 'Taylor Smith', email: 'taylor@example.com', goal: 'Stay active' }
    ])

    const teams = await Team.create([
      { name: 'Peak Performers', memberIds: users.slice(0, 2).map((user) => user._id) },
      { name: 'Morning Movers', memberIds: [users[2]._id] }
    ])

    await Activity.create([
      { userId: users[0]._id, type: 'Run', durationMinutes: 30, calories: 320, completedAt: new Date('2026-08-15') },
      { userId: users[1]._id, type: 'Strength', durationMinutes: 45, calories: 280, completedAt: new Date('2026-08-16') },
      { userId: users[2]._id, type: 'Cycling', durationMinutes: 40, calories: 360, completedAt: new Date('2026-08-17') }
    ])

    await LeaderboardEntry.create([
      { userId: users[0]._id, teamId: teams[0]._id, points: 860, rank: 1 },
      { userId: users[1]._id, teamId: teams[0]._id, points: 720, rank: 2 },
      { userId: users[2]._id, teamId: teams[1]._id, points: 640, rank: 3 }
    ])

    await Workout.create([
      { name: 'Full Body Starter', category: 'Strength', difficulty: 'Beginner', durationMinutes: 25 },
      { name: 'Steady Cardio Run', category: 'Cardio', difficulty: 'Intermediate', durationMinutes: 35 },
      { name: 'Mobility Reset', category: 'Mobility', difficulty: 'Beginner', durationMinutes: 15 }
    ])

    console.log('Seeded users, teams, activities, leaderboard, and workouts')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

void seedDatabase()
