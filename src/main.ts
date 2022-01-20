import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    methods: ['GET', 'POST', 'DELETE'],
    origin: '*',
  });
  await app.listen(3000);
}
bootstrap();
