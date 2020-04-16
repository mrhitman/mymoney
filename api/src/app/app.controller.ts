import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  public healthCheck(): string {
    return new Date().toString();
  }
}
