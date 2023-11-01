/* eslint-disable import/extensions */
import { STATUS } from '../utils/constants.js';

export default class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS.SEVER_ERR;
  }
}
