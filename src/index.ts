import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import errorMiddleware from './middlewares/error.middleware';
import dbMiddleware from './middlewares/db.middleware';
import { DataSource } from 'typeorm';
import { User } from './types/user';
import { route } from './routes/route';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

declare global {
	namespace Express {
		interface Request {
			db: DataSource;
			user: User;
		}
	}
}

app.use(dbMiddleware);
app.use(errorMiddleware);
app.use(json());
app.use(cookieParser());
app.use(
	cors({
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		allowedHeaders: 'Content-Type,authorization',
	})
);

app.use('/v1', route);
app.use('*', (req, res) => {
	res.send(`Api not find http://localhost:${port}${req.baseUrl}`);
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
