import { Module, forwardRef } from '@nestjs/common';
import { TypegooseModule as TM } from 'nestjs-typegoose';

import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { PlacesModel } from './models';
import { AuthModule } from '../auth';
import './places.profile';
import { UserModule } from '../user';


@Module({
  imports: [
    AuthModule,
    forwardRef(() => UserModule),
    TM.forFeature([PlacesModel])
],
  providers: [PlacesService],
  controllers: [PlacesController],
  exports: [PlacesService]
})
export class PlacesModule {}
