import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from 'src/app/app.module';

async function bootstrap() {
  config();

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
