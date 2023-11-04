import { Router } from 'express';
import {
  getCurrentUserInfo, getUsers, updateUserInfo, updateUserAvatar, getUserById,
} from '../controllers/users.js';
import { userLinkValidationSchema, updateUserValidationSchema } from '../validations/users.js';

const usersRouter = Router();
usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getCurrentUserInfo);
usersRouter.get('/users/:userId', userLinkValidationSchema, getUserById);
usersRouter.patch('/users/me', updateUserValidationSchema, updateUserInfo);
usersRouter.patch('/users/me/avatar', updateUserValidationSchema, updateUserAvatar);

export default usersRouter;
