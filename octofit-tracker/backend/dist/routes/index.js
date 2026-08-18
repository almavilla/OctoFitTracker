"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutRoutes = exports.leaderboardRoutes = exports.activityRoutes = exports.teamRoutes = exports.userRoutes = void 0;
const express_1 = require("express");
const models_1 = require("../models");
const createResourceRouter = (model) => {
    const router = (0, express_1.Router)();
    router.get('/', async (_request, response) => {
        try {
            const documents = await model.find().sort({ createdAt: -1 });
            response.json(documents);
        }
        catch (error) {
            response.status(500).json({ error: 'Unable to retrieve records' });
        }
    });
    router.get('/:id', async (request, response) => {
        try {
            const document = await model.findById(request.params.id);
            if (!document) {
                response.status(404).json({ error: 'Record not found' });
                return;
            }
            response.json(document);
        }
        catch (error) {
            response.status(400).json({ error: 'Invalid record id' });
        }
    });
    router.post('/', async (request, response) => {
        try {
            if (!request.body || typeof request.body !== 'object' || Array.isArray(request.body)) {
                response.status(400).json({ error: 'Request body must be an object' });
                return;
            }
            const document = await model.create(request.body);
            response.status(201).json(document);
        }
        catch (error) {
            response.status(400).json({ error: 'Unable to create record' });
        }
    });
    router.patch('/:id', async (request, response) => {
        try {
            const document = await model.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true });
            if (!document) {
                response.status(404).json({ error: 'Record not found' });
                return;
            }
            response.json(document);
        }
        catch (error) {
            response.status(400).json({ error: 'Unable to update record' });
        }
    });
    router.delete('/:id', async (request, response) => {
        try {
            const document = await model.findByIdAndDelete(request.params.id);
            if (!document) {
                response.status(404).json({ error: 'Record not found' });
                return;
            }
            response.status(204).send();
        }
        catch (error) {
            response.status(400).json({ error: 'Invalid record id' });
        }
    });
    return router;
};
exports.userRoutes = createResourceRouter(models_1.User);
exports.teamRoutes = createResourceRouter(models_1.Team);
exports.activityRoutes = createResourceRouter(models_1.Activity);
exports.leaderboardRoutes = createResourceRouter(models_1.LeaderboardEntry);
exports.workoutRoutes = createResourceRouter(models_1.Workout);
