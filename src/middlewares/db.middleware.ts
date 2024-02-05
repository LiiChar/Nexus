import { NextFunction, Response } from 'express';
import { RequestWithDB } from '../types/request';
import { Users } from '../entity/user.entity';
import { DataSource } from 'typeorm';
import { Projects } from '../entity/project.entity';

const dbMiddleware = async (
	req: RequestWithDB,
	res: Response,
	next: NextFunction
) => {
	try {
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

		req.db = await getDataSource();
		next();
	} catch (error) {
		console.error('Error connecting to the database:', error);
		res.status(500).send('Internal Server Error');
	}
};

export default dbMiddleware;
