import express, { json } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import cors from 'cors';
import helmet from 'helmet';
import { requestLogger, errorLogger } from './middleware/logger.js';
import usersRouter from './routes/users.js';
import cardsRouter from './routes/cards.js';
import authRouter from './routes/auth.js';
import errorHandler from './middleware/errorsHandler.js';
import NotFoundError from './errors/NotFoundError.js';
import Auth from './middleware/auth.js';

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const app = express();
app.use(json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001',
    'https://vwssrv.nomoredomainsrocks.ru', 'https://api.vwssrv.nomoredomainsrocks.ru'],
  credentials: true,
  maxAge: 3600,
}));
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(authRouter);
app.use(Auth);
app.use(cardsRouter);
app.use(usersRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует.'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

async function initServer() {
  await mongoose.connect(MONGO_URL);
  console.log('Data Base is connected');
  await app.listen(PORT);
  console.log(`Server Started at port ${PORT}`);
}

initServer();
