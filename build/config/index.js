"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("./morgan"));
dotenv_1.default.config();
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.e5uwp0b.mongodb.net/rbf`;
const PORT = process.env.PORT || 9090;
exports.config = {
    server: {
        port: PORT
    },
    mongo: {
        url: MONGO_URL
    },
    morgan: morgan_1.default
};
