import { Request, Response, Router } from 'express'
import { Model } from 'mongoose'
import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout
} from '../models'

const createResourceRouter = (model: Model<any>) => {
  const router = Router()

  router.get('/', async (_request: Request, response: Response) => {
    try {
      const documents = await model.find().sort({ createdAt: -1 })
      response.json(documents)
    } catch (error) {
      response.status(500).json({ error: 'Unable to retrieve records' })
    }
  })

  router.get('/:id', async (request: Request, response: Response) => {
    try {
      const document = await model.findById(request.params.id)
      if (!document) {
        response.status(404).json({ error: 'Record not found' })
        return
      }
      response.json(document)
    } catch (error) {
      response.status(400).json({ error: 'Invalid record id' })
    }
  })

  router.post('/', async (request: Request, response: Response) => {
    try {
      if (!request.body || typeof request.body !== 'object' || Array.isArray(request.body)) {
        response.status(400).json({ error: 'Request body must be an object' })
        return
      }

      const document = await model.create(request.body)
      response.status(201).json(document)
    } catch (error) {
      response.status(400).json({ error: 'Unable to create record' })
    }
  })

  router.patch('/:id', async (request: Request, response: Response) => {
    try {
      const document = await model.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true, runValidators: true }
      )
      if (!document) {
        response.status(404).json({ error: 'Record not found' })
        return
      }
      response.json(document)
    } catch (error) {
      response.status(400).json({ error: 'Unable to update record' })
    }
  })

  router.delete('/:id', async (request: Request, response: Response) => {
    try {
      const document = await model.findByIdAndDelete(request.params.id)
      if (!document) {
        response.status(404).json({ error: 'Record not found' })
        return
      }
      response.status(204).send()
    } catch (error) {
      response.status(400).json({ error: 'Invalid record id' })
    }
  })

  return router
}

export const userRoutes = createResourceRouter(User)
export const teamRoutes = createResourceRouter(Team)
export const activityRoutes = createResourceRouter(Activity)
export const leaderboardRoutes = createResourceRouter(LeaderboardEntry)
export const workoutRoutes = createResourceRouter(Workout)
