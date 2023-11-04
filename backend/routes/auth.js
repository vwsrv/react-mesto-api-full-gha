import { Router } from 'express';
import { loginUser, createUser } from '../controllers/auth';
import { userValidationSchema } from '../validations/users';

const authRouter = Router();
authRouter.post('/signin', userValidationSchema, loginUser);
authRouter.post('/signup', userValidationSchema, createUser);

export default authRouter;
