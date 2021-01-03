import { Module } from '@nestjs/common';
import { ConfigModule as CM } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AutomapperModule as AM } from 'nestjsx-automapper';
import { TypegooseModule as TM } from 'nestjs-typegoose';
import { join } from 'path';

import configuration from './shared/config';
import { PlacesModule } from './places';
import { UserModule } from './user';
import { AuthModule } from './auth';


const mongooseOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

@Module({
  imports: [
		ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*'],
    }),
    CM.forRoot({ load: [configuration], isGlobal: true }),
    AM.withMapper(),
    TM.forRoot(process.env.MONGODB_URL, mongooseOptions),
    UserModule,
    AuthModule,
    PlacesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
