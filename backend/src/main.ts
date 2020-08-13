import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { PORT } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const description = 'API Server for Places Application';
  const options = new DocumentBuilder()
                      .setTitle('Places API')
                      .setDescription(description)
                      .setVersion('1.0')
                      .addTag('users')
                      .addTag('places')
                      .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);

  await app.listen(PORT);
}
bootstrap();
