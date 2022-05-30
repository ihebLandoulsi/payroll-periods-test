import * as dotenv from 'dotenv';
import { useContainer } from 'typeorm';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //allow Dependency injectiction in validatorsConstraints classes
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

dotenv.config();
bootstrap();
