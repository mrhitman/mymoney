import { config } from 'dotenv';

config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expiresIn: 5 * 60,
};
