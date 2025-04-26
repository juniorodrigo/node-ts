import { Router } from 'express';
import { getUsers, getUserById, createUser } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', createUser);

export default userRouter;
