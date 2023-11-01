/* eslint-disable import/extensions */
import { Router } from 'express';
import { loginUser, createUser } from '../controllers/auth.js';
import { userValidationSchema } from '../validations/users.js';

const authRouter = Router();
authRouter.post('/signin', userValidationSchema, loginUser);
authRouter.post('/signup', userValidationSchema, createUser);

export default authRouter;
