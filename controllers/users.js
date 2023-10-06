import { User } from "../models/user";
import { userValidation } from "../validations/user";
import { userAvatarValidation } from "../validations/user";

export const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => {
      res.status(500).send({ message: 'Произошла ошибка на стороне сервера.' })
    })
}

export const createUser = (req, res) => {
  const { error } = userValidation(req.body);
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.status(200).send({ data: user }))
    .catch(() => {
      if (error) {
        return res.status(400).send({ message: error.details[0].message })
      } return res.status(500).send({ message: 'Произошла ошибка на стороне сервера.' })
    })
}

export const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then(data => res.send({ data }))
    .catch(err => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Пользователь по указанному _id не найден.' })
      }
      return res.status(500).send({ message: 'Произошла ошибка на стороне сервера' })
    })
}

export const updateUserInfo = (req, res) => {
  const { error } = userValidation(req.body);
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true, upsert: true })
    .then(updatedUserInfo => {
      if (!updatedUserInfo) {
        return res.status(404).send({ message: 'Пользователь с таким ID не зарегистрирован' })
      }
      res.send({ data: updatedUserInfo })
    })
    .catch((err) => {
      console.log(err);
      if (error) {
        return res.status(400).send({ message: error.details[0].message })
      } return res.status(500).send({ message: 'Произошла ошибка на стороне сервера.' })
    })
}

export const updateUserAvatar = (req, res) => {
  const { error } = userAvatarValidation(req.body);
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true, upsert: true })
    .then(updatedAvatar => {
      if (!updatedAvatar) {
        return res.status(404).send({ message: 'Пользователь с таким ID не зарегистрирован' })
      }
      return res.send({ data: updatedAvatar })
    })
    .catch((err) => {
      console.log(err)
      if (error) {
        return res.status(400).send({ message: error.details[0].message })
      } return res.status(500).send({ message: 'Произошла ошибка на стороне сервера.' })
    })
}