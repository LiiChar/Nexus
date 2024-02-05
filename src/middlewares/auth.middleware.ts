import { Cookie } from 'cookie';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import { RequestWithDB, RequestWithUser } from '../types/request';
import WrongAuthenticationTokenException from '../exception/WrongAuthenticationTokenException';
import { Users } from '../entity/user.entity';

const authJWTMiddleware = async (
	req: RequestWithUser & RequestWithDB,
	res: Response,
	next: NextFunction
) => {
	let auth: string;
	if (req.cookies && req.cookies.authorization) {
		auth = req.cookies.jwt;
	} else if (req.headers.authorization) {
		auth = req.headers.authorization;
	} else {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	const secret = process.env.JWT_SECRET!;
	try {
		const verificationResponse = jwt.verify(auth, secret) as {
			id: string;
		};
		const id = verificationResponse.id;

		const user = await req.db.getRepository(Users).findOne({
			where: {
				id: id,
			},
		});
		if (user) {
			req.user = user;
			next();
		} else {
			next(new WrongAuthenticationTokenException());
		}
	} catch (error) {
		next(new WrongAuthenticationTokenException());
	}
};

export default authJWTMiddleware;
