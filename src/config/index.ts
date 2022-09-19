import dotenv from 'dotenv';
import morgan from './morgan';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.e5uwp0b.mongodb.net/rbf`;

const PORT = process.env.PORT || 9090;

export const config = {
	server: {
		port: PORT
	},
	mongo: {
		url: MONGO_URL
	},
	morgan
};
