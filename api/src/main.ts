import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from 'src/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { flow } from 'mobx-state-tree';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule, {
    logger: console,
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('MyMoney')
    .setDescription('My Money API description')
    .addBearerAuth(
      {
        type: 'apiKey',
        name: 'JWT Token',
        flows: {
          implicit: {
            authorizationUrl: 'http://localhost:4000/login',
            refreshUrl: 'http://localhost:4000/refresh',
            scopes: {},
          },
        },
      },
      'header',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
