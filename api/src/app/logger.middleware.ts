import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    global.console.log(`[${new Date()}] ${req.method} ${req.path}`);
    next();
  }
}
