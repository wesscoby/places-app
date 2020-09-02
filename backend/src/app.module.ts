import { Module } from '@nestjs/common';
import { ConfigModule as CM, ConfigService } from '@nestjs/config';
import { AutomapperModule as AM } from 'nestjsx-automapper';
import { TypegooseModule as TM } from 'nestjs-typegoose';

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
