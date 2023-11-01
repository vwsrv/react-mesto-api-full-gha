/* eslint-disable import/extensions */
import { Router } from 'express';
import {
  deleteCard, createCard, getCards, addLikeCard, dislikeCard,
} from '../controllers/cards.js';
import {
  addCardValidationSchema, cardLinkValidationSchema, deleteCardValidationSchema,
} from '../validations/cards.js';
import auth from '../middleware/auth.js';

const cardsRouter = Router();

cardsRouter.get('/cards', auth, getCards);
cardsRouter.post('/cards', addCardValidationSchema, createCard);
cardsRouter.delete('/cards/:cardId', deleteCardValidationSchema, deleteCard);
cardsRouter.put('/cards/:cardId/likes', cardLinkValidationSchema, addLikeCard);
cardsRouter.delete('/cards/:cardId/likes', cardLinkValidationSchema, dislikeCard);

export default cardsRouter;
