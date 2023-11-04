import jwt from 'jsonwebtoken';
import AuthError from '../errors/AuthError';

const { JWT_SECRET, NODE_ENV } = process.env;

export default function Auth(req, res, next) {
  let payload;

  try {
    const authorization = req.cookies.mestoToken;

    if (!authorization) {
      throw new AuthError('Произошла ошибка авторизации');
    }

    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'dev_secret');
    req.user = payload;
    next();
  } catch (err) {
    if (err.message === 'JsonWebTokenError') {
      return new AuthError('С токеном что-то не так.');
    } return next(err);
  }
}
