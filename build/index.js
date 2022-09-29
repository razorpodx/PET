"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./lib/logger"));
const index_1 = require("./config/index");
const User_1 = __importDefault(require("./routes/User"));
const Account_1 = __importDefault(require("./routes/Account"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(index_1.config.morgan);
// Connect To MongoDB
mongoose_1.default
    .connect(index_1.config.mongo.url, {
    retryWrites: true,
    w: 'majority'
})
    .then(() => {
    logger_1.default.info('MongoDB Connected');
    startServer();
})
    .catch((err) => {
    logger_1.default.error(err);
});
// Starts the Server when MongoDB is connected
const startServer = () => {
    // Middlewares
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // Routes
    app.use('/user', User_1.default);
    app.use('/account', Account_1.default);
    // Health Check Route
    app.get('/ping', (req, res) => res.status(200).json({ message: 'pong' }));
    // Route Not Found
    app.use((req, res) => {
        res.status(404).json({ message: 'API Not Found' });
    });
    // Start Server
    http_1.default.createServer(app).listen(index_1.config.server.port, () => {
        logger_1.default.info(`Server started on port ${index_1.config.server.port}`);
    });
};
