import { Request, Response } from 'express';
import { Projects } from '../entity/project.entity';

class ProjectController {
	getAllProject = async (req: Request, res: Response) => {
		try {
			const projects = await req.db.getRepository(Projects).find();
			res.json(projects);
		} catch (error) {
			console.error('Error fetching projects:', error);
			res.status(500).send('Internal Server Error');
		}
	};

	getProjectById = async (req: Request, res: Response) => {
		const projectId = req.params.id;

		try {
			const project = await req.db.getRepository(Projects).findOne({
				where: {
					id: projectId,
				},
			});

			if (!project) {
				return res.status(404).json({ message: 'User not found' });
			}

			res.json(project);
		} catch (error) {
			console.error('Error fetching user by ID:', error);
			res.status(500).send('Internal Server Error');
		}
	};

	createProject = async (req: Request, res: Response) => {
		const { title, description } = req.body;

		try {
			const newUser = req.db.getRepository(Projects).create({
				title,
				description,
				leader_id: req.user.id,
			});

			await req.db.getRepository(Projects).save(newUser);
			res.status(201).json(newUser);
		} catch (error) {
			console.error('Error creating user:', error);
			res.status(500).send('Internal Server Error');
		}
	};
}

export default new ProjectController();
