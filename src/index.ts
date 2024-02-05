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

const connection = new DataSource({
	type: 'postgres',
	host: process.env.POSTGRES_HOST,
	port: Number(process.env.POSTGRES_PORT) || 6500,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	synchronize: true,
	logging: true,
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
});

connection
	.initialize()
	.then(async () => {
		console.log('Connection initialized with database...');
	})
	.catch((error) => console.log(error));

const getDataSource = (delay = 3000): Promise<DataSource> => {
	if (connection.isInitialized) return Promise.resolve(connection);

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (connection.isInitialized) resolve(connection);
			else reject('Failed to create connection with database');
		}, delay);
	});
};

// app.use(dbMiddleware);
app.use(async (req, res) => {
	req.db = await getDataSource();
});
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
