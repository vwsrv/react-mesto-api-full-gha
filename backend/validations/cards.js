/* eslint-disable import/extensions */
import Joi from 'joi';
import { celebrate } from 'celebrate';
import { urlPattern } from '../utils/constants.js';

export const addCardValidationSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().regex(urlPattern),
  }),
});

export const cardLinkValidationSchema = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

export const deleteCardValidationSchema = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});
