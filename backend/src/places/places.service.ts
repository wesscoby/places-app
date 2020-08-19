import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType as RMT } from '@typegoose/typegoose';

import { Place } from './places.model';
import { CreatePlaceDTO, UpdatePlaceDto } from './places.dto';
import { BaseService } from '../shared';
// import { UserService } from 'src/user/user.service';


@Injectable()
export class PlacesService extends BaseService<Place> {
  constructor(
    @InjectModel(Place) private readonly places: RMT<typeof Place>,
  ) {
    super(places);
  }

  async create(place: CreatePlaceDTO): Promise<Place> {
    // const user = await this.users.findById("5f3be7dba25ce972963f86c1");
    const newPlace = await this.places.findOrCreate({
      ...place
    });
    // await user.places.push(newPlace.doc.toObject({ getters: true }));
    // await user.
    return await newPlace.doc.toJSON();
  }

  async update(id: string, updateDto: UpdatePlaceDto): Promise<Place> {
    const updated = await this.places.findByIdAndUpdate(id, updateDto);
    return updated.toJSON();
  }
}
