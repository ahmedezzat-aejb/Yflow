import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // بنخلي البورت مرن: لو متعرف في البيئة يستخدمه، ولو لأ يستخدم 3000
  const port = process.env.PORT || 3000;

  app.enableCors();

  // بنادي على listen مرة واحدة بسسسس
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
