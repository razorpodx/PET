import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';

import Logger from './lib/logger';
import { config } from './config/index';

import UserRoutes from '@routes/User';
dotenv.config();

const app: Express = express();

app.use(config.morgan);

// Starts the Server when MongoDB is connected
const startServer = () => {
	// Middlewares
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// Routes
	app.use('/user', UserRoutes);

	// Health Check Route
	app.get('/ping', (req: Request, res: Response) => res.status(200).json({ message: 'pong' }));

	// Route Not Found
	app.use((req: Request, res: Response) => {
		res.status(404).json({ message: 'API Not Found' });
	});
	// Start Server
	http.createServer(app).listen(config.server.port, () => {
		Logger.info(`Server started on port ${config.server.port}`);
	});
};

startServer();
