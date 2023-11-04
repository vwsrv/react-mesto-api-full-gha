import { STATUS } from '../utils/constants';

export default class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS.NOT_FOUND;
  }
}
