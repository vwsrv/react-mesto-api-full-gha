import { STATUS } from '../utils/constants';

export default class AlreadyExists extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS.CONFLICT;
  }
}
