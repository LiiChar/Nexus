import { Router } from 'express';
import authController from '../controller/auth.controller';
import authJWTMiddleware from '../middlewares/auth.middleware';

const { getMe, login, logout, registration, verificated } = authController;
const AuthRouters = Router()
	.post('/login', login)
	.post('/register', registration);

const NotAuthRouters = Router()
	.use(authJWTMiddleware)
	.get('/getme', getMe)
	.get('/logout', logout)
	.get('/verify', verificated);

export const AuthRouter = Router()
	.use('/auth', AuthRouters)
	.use('/auth', NotAuthRouters);
