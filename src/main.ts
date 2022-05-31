import * as dotenv from 'dotenv';
import { useContainer } from 'typeorm';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Configuration de l'interface Swagger API
  const config = new DocumentBuilder()
    .setTitle('Gestion des Périodes de paie')
    .setDescription(
      'API prototype pour la gestion des périodes de paie: période mensuelle et période congés ',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //allow Dependency injectiction in validatorsConstraints classes
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

dotenv.config();
bootstrap();
