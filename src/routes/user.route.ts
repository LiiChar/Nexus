import { Router } from 'express';
import authJWTMiddleware from '../middlewares/auth.middleware';
import UserController from '../controller/user.controller';

const { createUser, getAllUsers, getUserById } = UserController;
const UserAuthRouters = Router()
	.use(authJWTMiddleware)
	.get('/:id', getUserById)
	.post('/create', createUser);

const UserNotAuthRouters = Router().get('/', getAllUsers).post('/');

export const UserRouter = Router()
	.use('/user', UserAuthRouters)
	.use('/user', UserNotAuthRouters);
