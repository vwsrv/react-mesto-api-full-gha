import jwt from 'jsonwebtoken';

const { JWT_SECRET, NODE_ENV } = process.env;

export default function generateToken(payload) {
  const token = jwt.sign(payload, NODE_ENV ? JWT_SECRET : 'dev_secret', { expiresIn: '7d' });
  return token;
}
