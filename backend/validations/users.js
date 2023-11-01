/* eslint-disable import/extensions */
import Joi from 'joi';
import { celebrate } from 'celebrate';
import { urlPattern } from '../utils/constants.js';

export const userValidationSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    about: Joi.string().min(2).max(30).optional(),
    avatar: Joi.string().regex(urlPattern).optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

export const updateUserValidationSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    about: Joi.string().min(2).max(30).optional(),
    avatar: Joi.string().regex(urlPattern).optional(),
  }),
});

export const userLinkValidationSchema = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});
