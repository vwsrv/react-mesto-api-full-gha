import Card from '../models/card.js';
import NotFoundError from '../errors/NotFoundError.js';
import ValidationError from '../errors/ValidationError.js';
import CastError from '../errors/CastError.js';
import { STATUS } from '../utils/constants.js';

export const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

export const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(STATUS.CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new CastError('Переданы некорретные данные для создания карточки'));
      }
      return next(err);
    });
};

export const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Передана карточка с несуществующим _id.');
    })
    .then((cardToDelete) => {
      if (req.user._id !== cardToDelete.owner.toString()) {
        throw new ValidationError('Недостаточно прав для удаления карточки.');
      }
      Card.deleteOne(cardToDelete)
        .then(() => res.status(STATUS.OK).send(cardToDelete));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Переданы некорретные данные для удаления карточки'));
      }
      return next(err);
    });
};

export const addLikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Передана карточка с несуществующим _id');
    })
    .then((card) => {
      res.status(STATUS.OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Переданы некорретные данные для постановки лайка'));
      }
      return next(err);
    });
};

export const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Передана карточка с несуществующим _id');
    })
    .then((card) => {
      res.status(STATUS.OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Переданы некорретные данные для снятия лайка'));
      }
      return next(err);
    });
};
