import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import generateToken from '../utils/jwt.js';
import AuthError from '../errors/AuthError.js';
import AlreadyExists from '../errors/AlreadyExists.js';
import ValidationError from '../errors/ValidationError.js';
import { STATUS } from '../utils/constants.js';

export const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные имя пользователя или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильные имя пользователя или пароль');
          }
          const token = generateToken({ _id: user._id, email: user.email });
          res.cookie('mestoToken', token, { maxAge: '604800000', httpOnly: true, sameSite: true });
          return res.status(STATUS.OK).send({ _id: user._id });
        });
    })
    .catch(next);
};

export const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((createdUser) => {
      const { _id } = createdUser;
      res.status(STATUS.CREATED).send({
        name, about, avatar, email, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные для создания пользователя.'));
      }
      if (err.code === 11000) {
        return next(new AlreadyExists('Пользователь с таким email уже зарегистрирован'));
      }
      return next(err);
    });
};
