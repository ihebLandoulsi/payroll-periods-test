import * as dotenv from 'dotenv';
import { useContainer } from 'typeorm';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //allow Dependency injectiction in validatorsConstraints classes
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}

dotenv.config();
bootstrap();
