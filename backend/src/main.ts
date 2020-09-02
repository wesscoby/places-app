import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared';


interface AppConfig {
  host: string;
  port: string;
}

const corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.use(helmet());
  
  const config = app.get(ConfigService);
  const { port } = config.get<AppConfig>('app');

  const description = '**API Server** for Places App - an app where users can share places *(with image and coordinates)* with other users';

  const options = new DocumentBuilder()
                      .setTitle('Places API')
                      .setDescription(description)
                      .setContact(
                        'WessCoby', 
                        'https://github.com/wesscoby', 
                        'cobygiven@gmail.com'
                      )
                      .setVersion('1.0')
                      .addTag('Auth')
                      .addTag('Users')
                      .addTag('Places')
                      .addBearerAuth()
                      .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port);
}
bootstrap();
