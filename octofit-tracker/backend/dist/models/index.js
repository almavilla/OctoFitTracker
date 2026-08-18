"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const resourceSchema = new mongoose_1.default.Schema({}, {
    strict: false,
    timestamps: true
});
exports.User = mongoose_1.default.model('User', resourceSchema, 'users');
exports.Team = mongoose_1.default.model('Team', resourceSchema, 'teams');
exports.Activity = mongoose_1.default.model('Activity', resourceSchema, 'activities');
exports.LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', resourceSchema, 'leaderboard');
exports.Workout = mongoose_1.default.model('Workout', resourceSchema, 'workouts');
