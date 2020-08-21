import { Module } from '@nestjs/common';
import { TypegooseModule as TM } from 'nestjs-typegoose';

import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { PlacesModel } from './models';
import { AuthModule } from '../auth';
import './places.profile';


@Module({
  imports: [
    AuthModule,
    TM.forFeature([PlacesModel])
],
  providers: [PlacesService],
  controllers: [PlacesController],
  exports: [PlacesService]
})
export class PlacesModule {}
