import { config } from 'src/config';

export const jwtConstants = {
  secret: config.app.jwt.secret,
  expiresIn: config.app.jwt.expiresIn,
};
