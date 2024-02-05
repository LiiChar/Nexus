import { Request } from 'express';
import { DataSource } from 'typeorm';
import { User } from './user';

export type RequestWithUser = Request & { user: User };
export type RequestWithDB = Request & { db: DataSource };
