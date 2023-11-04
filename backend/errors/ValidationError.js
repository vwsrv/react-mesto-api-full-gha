import { STATUS } from '../utils/constants';

export default class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS.FORBIDDEN;
  }
}
