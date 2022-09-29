import dotenv from 'dotenv';
import morgan from './morgan';

dotenv.config();

const PORT = process.env.PORT || 9090;

export const config = {
	server: {
		port: PORT
	},
	morgan
};
