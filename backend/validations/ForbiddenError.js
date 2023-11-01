/* eslint-disable import/extensions */
import { STATUS } from '../utils/constants.js';

export default class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS.FORBIDDEN;
  }
}
