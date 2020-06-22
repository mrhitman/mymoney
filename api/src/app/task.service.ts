import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  @Cron('0 * * * * *')
  public handleCron() {
    console.log('Called when the current second every 1 minute');
  }
}
