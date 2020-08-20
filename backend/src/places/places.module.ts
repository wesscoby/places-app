import { Module, Global } from '@nestjs/common';
import { TypegooseModule as TM } from 'nestjs-typegoose';

import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { PlacesModel } from './models';
import './places.profile';


@Global()
@Module({
  imports: [TM.forFeature([PlacesModel])],
  providers: [PlacesService],
  controllers: [PlacesController],
  exports: [PlacesService]
})
export class PlacesModule {}
