import { STATUS } from '../utils/constants';

export default class CastError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS.BAD_REQUEST;
  }
}
