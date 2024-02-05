import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '../entity/user.entity';

class ProjectController {
	registration = async (req: Request, res: Response) => {
		const { name, password } = req.body;
		const rep = req.db.getRepository(Users);
		try {
			const user_exists = await rep.exists({
				where: {
					name,
				},
			});

			if (user_exists) {
				return res
					.status(403)
					.json({ message: `User with name ${name} exists` });
			}
			const hashedPassword = await bcrypt.hash(password, 10);
			const { generatedMaps } = await rep.insert({
				name,
				password: hashedPassword,
			});
			res.status(200).json(generatedMaps);
		} catch (error) {
			console.error('Error fetching projects:', error);
			res.status(500).send('Internal Server Error');
		}
	};

	login = async (req: Request, res: Response) => {
		const { name, password } = req.body;
		const rep = req.db.getRepository(Users);

		try {
			const user = await rep.findOne({
				where: {
					name: name,
				},
			});

			if (user == null) {
				return res.status(404).json({ message: 'User not found' });
			}

			if (!bcrypt.compare(password, user.password)) {
				return res.status(403).json({ message: 'Password is wrong' });
			}

			const token = jwt.sign(
				{ userId: user.id },
				process.env.JWT_SECRET!,
				{ expiresIn: process.env.JWT_EXPIRED_IN }
			);

			// Устанавливаем токен в куку
			res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // 1 час
			res.status(200).json({ token: token });
		} catch (error) {
			console.error('Error fetching user by ID:', error);
			res.status(500).send('Internal Server Error');
		}
	};

	logout = async (req: Request, res: Response) => {
		res.clearCookie('jwt');
		res.status(200).json({ message: 'User is log-out' });
	};

	verificated = async (req: Request, res: Response) => {};

	getMe = async (req: Request, res: Response) => {
		res.status(200).json(req.user);
	};
}

export default new ProjectController();
