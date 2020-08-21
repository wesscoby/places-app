import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType as RMT } from '@typegoose/typegoose';

import { PlacesModel, CreatePlaceDto, UpdatePlaceDto } from './models';
import { BaseService } from '../shared';
import { UserModel, UserService } from '../user';


@Injectable()
export class PlacesService extends BaseService<PlacesModel> {
  constructor(
    @InjectModel(PlacesModel) private readonly places: RMT<typeof PlacesModel>,
    // @Inject(UserService) private users: UserService
  ) {
    super(places);
  }

  // TODO Refactor after implementation of auth
  async create(place: CreatePlaceDto): Promise<PlacesModel> {
    // const user = await this.users.getById("5f3d3e57d113bd4c1098a243");

    const newPlace = await this.places.findOrCreate({
      ...place, 
      creator: this.toObjectId("5f3dc037f0ff225139223fae")
    });
    return await newPlace.doc.toJSON();
  }

  async update(id: string, updateDto: UpdatePlaceDto): Promise<PlacesModel> {
    const updated = await this.places.findByIdAndUpdate(id, updateDto);
    return updated.toJSON();
  }
}
