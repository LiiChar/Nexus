import { Router } from 'express';
import { ProjectRouter } from './project.route';
import { UserRouter } from './user.route';
import { AuthRouter } from './auth.route';

export const route = Router()
	.use('/api', ProjectRouter)
	.use('/api', AuthRouter)
	.use('/api', UserRouter);
