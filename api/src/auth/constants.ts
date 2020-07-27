import { config } from 'dotenv';

config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expiresIn: 31 * 24 * 60 * 60,
};
