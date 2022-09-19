import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';

import Logger from './lib/logger';
import { config } from './config/index';

dotenv.config();

const app: Express = express();

app.use(config.morgan);

// Connect To MongoDB
mongoose
	.connect(config.mongo.url, {
		retryWrites: true,
		w: 'majority'
	})
	.then(() => {
		Logger.info('MongoDB Connected');
		startServer();
	})
	.catch((err) => {
		Logger.error(err);
	});

// Starts the Server when MongoDB is connected
const startServer = () => {
	// Middlewares
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

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
