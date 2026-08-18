"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/users', routes_1.userRoutes);
app.use('/api/teams', routes_1.teamRoutes);
app.use('/api/activities', routes_1.activityRoutes);
app.use('/api/leaderboard', routes_1.leaderboardRoutes);
app.use('/api/workouts', routes_1.workoutRoutes);
const MONGO_URL = process.env.MONGODB_URI || process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit_db';
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Backend running on port ${PORT}`);
    });
};
const checkMongoConnection = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URL, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('MongoDB connection failed. Make sure MongoDB is running on port 27017.');
        console.error(error);
    }
};
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        environment: process.env.NODE_ENV || 'development',
        mongo: mongoose_1.default.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});
void checkMongoConnection();
startServer();
