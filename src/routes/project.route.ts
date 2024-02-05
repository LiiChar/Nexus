import { Router } from 'express';
import authJWTMiddleware from '../middlewares/auth.middleware';
import ProjectController from '../controller/project.controller';

const { createProject, getAllProject, getProjectById } = ProjectController;
const ProjectAuthRouters = Router()
	.use(authJWTMiddleware)
	.get('/:id', getAllProject)
	.post('/create', createProject);

const ProjectNotAuthRouters = Router().get('/', getProjectById).post('/');

export const ProjectRouter = Router()
	.use('/project', ProjectAuthRouters)
	.use('/project', ProjectNotAuthRouters);
