import jwt from 'jsonwebtoken';

const { JWT_SECRET, NODE_ENV } = process.env;

export default function auth(req, res, next) {
  let payload;

  try {
    const authorization = req.cookies.mestoToken;

    if (!authorization) {
      throw new Error('AuthFailed');
    }
    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'dev_secret');
  } catch (err) {
    if (err.message === 'AuthFailed') {
      return res.status(401).send({ message: 'Неправильные имя пользователя или пароль' });
      ;
    }
    if (err.message === 'JsonWebTokenError') {
      return res.status(401).send({ message: 'С токеном что-то не так' });
      ;
    }
    return res.status(500).send({ message: 'Произошла ошибка на стороне сервера' });
  }

  req.user = payload;
  return next();
}
