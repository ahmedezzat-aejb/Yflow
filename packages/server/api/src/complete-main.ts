import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/complete-app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // API prefix
  app.setGlobalPrefix('api');

  // Port configuration
  const port = process.env.PORT || 3000;

  await app.listen(port);

  Logger.log(`🚀 Yflow API is running on: http://localhost:${port}`);
  Logger.log(`� WebSocket endpoint: ws://localhost:${port}`);
  Logger.log(`� API endpoint: http://localhost:${port}/api`);
}

bootstrap();
