/* eslint-disable import/extensions */
import { STATUS } from '../utils/constants.js';

export default class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS.NOT_FOUND;
  }
}
