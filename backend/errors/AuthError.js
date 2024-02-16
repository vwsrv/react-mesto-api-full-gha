import { STATUS } from '../utils/constants.js';

export default class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS.AUTH_ERROR;
  }
}
