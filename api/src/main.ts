import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app/app.module';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
