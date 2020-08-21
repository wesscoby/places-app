import { Module } from '@nestjs/common';
import { AutomapperModule as AM } from 'nestjsx-automapper';
import { TypegooseModule as TM } from 'nestjs-typegoose';

import { PlacesModule } from './places';
import { UserModule } from './user';
import { ConfigService, SharedModule } from './shared';
import { AuthModule } from './auth';


const mongooseOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

const config = new ConfigService();
const url = config.get<string>('database.url');

@Module({
  imports: [
    AM.withMapper(),
    TM.forRoot(url, mongooseOptions),
    SharedModule,
    UserModule,
    AuthModule,
    PlacesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
