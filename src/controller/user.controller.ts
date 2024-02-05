import { Request, Response } from 'express';
import { Users } from '../entity/user.entity';
import bcrypt from 'bcrypt';

class UserController {
	getAllUsers = async (req: Request, res: Response) => {
		try {
			const users = await req.db.getRepository(Users).find();
			res.json(users);
		} catch (error) {
			console.error('Error fetching users:', error);
			res.status(500).send('Internal Server Error');
		}
	};

	getUserById = async (req: Request, res: Response) => {
		const userId = req.params.id;

		try {
			const user = await req.db.getRepository(Users).findOne({
                where: {
                    id: userId
                }
            });

			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			res.json(user);
		} catch (error) {
			console.error('Error fetching user by ID:', error);
			res.status(500).send('Internal Server Error');
		}
	};

	createUser = async (req: Request, res: Response) => {
		const { name, email, password } = req.body;

		try {
			const hashedPassword = await bcrypt.hash(password, 10);
			const newUser = req.db.getRepository(Users).create({
				name,
				email,
				password: hashedPassword,
			});

			await req.db.getRepository(Users).save(newUser);
			res.status(201).json(newUser);
		} catch (error) {
			console.error('Error creating user:', error);
			res.status(500).send('Internal Server Error');
		}
	};
}

export default new UserController();
