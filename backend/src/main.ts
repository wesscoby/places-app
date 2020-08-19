import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { ConfigService, HttpExceptionFilter } from './shared';


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
  const { host, port } = config.get<AppConfig>('app');

  const prefix = config.get<string>('api.prefix');
  const server = `${host}/${prefix}`;
  const description = 'API Server for Places Application';
  const options = new DocumentBuilder()
                      .setTitle('Places API')
                      .setDescription(description)
                      .setVersion('1.0')
                      .addServer(server)
                      .addTag('Auth')
                      .addTag('Users')
                      .addTag('Places')
                      .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(prefix, app, document);

  app.setGlobalPrefix(prefix);
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port);
}
bootstrap();
