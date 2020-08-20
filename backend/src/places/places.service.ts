import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType as RMT } from '@typegoose/typegoose';

import { Place } from './places.model';
import { CreatePlaceDTO, UpdatePlaceDto } from './places.dto';
import { BaseService } from '../shared';
import { User, UserService } from '../user';


@Injectable()
export class PlacesService extends BaseService<Place> {
  constructor(
    @InjectModel(Place) private readonly places: RMT<typeof Place>,
    private users: UserService
  ) {
    super(places);
  }

  // TODO Refactor after implementation of auth
  async create(place: CreatePlaceDTO): Promise<Place> {
    const user = await this.users.getById("5f3d3e57d113bd4c1098a243");

    const newPlace = await this.places.findOrCreate({
      ...place, 
      creator: this.toObjectId(user.id)
    });
    return await newPlace.doc.toJSON();
  }

  async update(id: string, updateDto: UpdatePlaceDto): Promise<Place> {
    const updated = await this.places.findByIdAndUpdate(id, updateDto);
    return updated.toJSON();
  }
}
