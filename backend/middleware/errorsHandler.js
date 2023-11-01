/* eslint-disable import/extensions */
import { STATUS } from '../utils/constants.js';

export default function errorHandler(err, req, res, next) {
  const { statusCode = STATUS.SEVER_ERR, message } = err;
  res.status(statusCode).send({ message: statusCode === STATUS.SEVER_ERR ? 'Произошла ошибка на стороне сервера' : message });
  next(err);
}
