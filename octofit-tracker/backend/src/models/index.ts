import mongoose, { InferSchemaType } from 'mongoose'

const resourceSchema = new mongoose.Schema(
  {},
  {
    strict: false,
    timestamps: true
  }
)

export const User = mongoose.model('User', resourceSchema, 'users')
export const Team = mongoose.model('Team', resourceSchema, 'teams')
export const Activity = mongoose.model('Activity', resourceSchema, 'activities')
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', resourceSchema, 'leaderboard')
export const Workout = mongoose.model('Workout', resourceSchema, 'workouts')

export type ResourceDocument = InferSchemaType<typeof resourceSchema>
