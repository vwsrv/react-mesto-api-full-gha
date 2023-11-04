import { STATUS } from '../utils/constants.js';

export default class AlreadyExists extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS.CONFLICT;
  }
}
