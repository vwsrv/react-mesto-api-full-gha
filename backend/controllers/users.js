/* eslint-disable import/extensions */
import User from '../models/user.js';
import AuthError from '../validations/AuthError.js';
import NotFoundError from '../validations/NotFoundError.js';
import { STATUS } from '../utils/constants.js';

export const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(STATUS.OK).send({ data: users }))
    .catch(next);
};

export const getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(STATUS.OK).send(user);
    })
    .catch(next);
};

export const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователя с таким _id не существует');
    })
    .then((data) => {
      res.status(STATUS.OK).send(data);
    })
    .catch(next);
};

export const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователя с таким _id не существует');
    })
    .then((updatedUserInfo) => {
      res.status(STATUS.OK).send(updatedUserInfo);
    })
    .catch(next);
};

export const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true, upsert: true })
    .orFail(() => {
      throw new AuthError('Пользователь с таким ID не зарегистрирован');
    })
    .then((updatedAvatar) => {
      res.status(STATUS.OK).send(updatedAvatar);
    })
    .catch(next);
};
