import { Request, Response } from 'express';
import { getAllUsers, getUser, addUser } from '../services/userService.js';

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await getAllUsers();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: 'Error retrieving users' });
	}
};

export const getUserById = async (req: Request, res: Response) => {
	try {
		const user = await getUser(req.params.id);
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Error retrieving user' });
	}
};

export const createUser = async (req: Request, res: Response) => {
	try {
		const newUser = await addUser(req.body);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ message: 'Error creating user' });
	}
};
