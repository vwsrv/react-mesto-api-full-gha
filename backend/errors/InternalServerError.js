import { STATUS } from '../utils/constants';

export default class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS.SEVER_ERR;
  }
}
