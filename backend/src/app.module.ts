import { Module } from '@nestjs/common';
import { AutomapperModule as AM } from 'nestjsx-automapper';
import { TypegooseModule as TM } from 'nestjs-typegoose';

// import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { PlacesModule } from './places/';
import { UserModule } from './user/user.module';
import { ConfigService, SharedModule } from './shared';


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
    PlacesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
