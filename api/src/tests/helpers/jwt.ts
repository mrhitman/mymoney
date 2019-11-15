import jwt from 'jsonwebtoken';

export default (data, options = {}) =>
  `Bearer ${jwt.sign(data, process.env.SALT, options)}`;
