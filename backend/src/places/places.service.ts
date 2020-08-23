import { 
  Injectable, NotFoundException, Inject, forwardRef, BadRequestException 
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType as RMT } from '@typegoose/typegoose';

import { PlacesModel, CreatePlaceDto, UpdatePlaceDto } from './models';
import { BaseService } from '../shared';
import { UserService } from '../user';


@Injectable()
export class PlacesService extends BaseService<PlacesModel> {
  constructor(
    @InjectModel(PlacesModel) private readonly places: RMT<typeof PlacesModel>,
    @Inject(forwardRef(() => UserService)) private readonly users: UserService
  ) {
    super(places);
  }

  async getPlacesByUser(uid: string): Promise<PlacesModel[]> {
    try {
      const places = await this.places.find({ creator: this.ID(uid) });
      if(!places || places.length === 0) return [];

      return places.map(place => place.toJSON());
    } catch(error) {
      throw new NotFoundException(error.message)
    }
  }

  async createPlace(
    uid: string, placeDto: CreatePlaceDto
  ): Promise<PlacesModel> {
    try {
      const user = await this.users.db.findById(this.ID(uid));
      const place = await this.places.findOrCreate({
        ...placeDto, creator: user._id 
      });

      await user.places.push(place.doc);
      await user.save();
      return await place.doc.toJSON();
    } catch(error) {
      throw new BadRequestException('Saving failed. Try again!');
    }
  }

  async updatePlace(
    pid: string, { title, description, image}: UpdatePlaceDto
  ): Promise<PlacesModel> {
    try {
      const place = await this.places.findById(this.ID(pid));
      if(!place) throw new NotFoundException(
        `Place with id ${pid} does not exist`
      );

      place.title = title ?? place.title;
      place.description = description ?? place.description;
      place.image = image ?? place.image;

      await place.save();
      return place.toJSON();
    } catch(error) {
      throw new NotFoundException(error.message);
    }
  } 

  async deletePlace(pid: string, uid: string) {
    try {
      const place = await this.places.findOne({ _id: this.ID(pid)});

      if(!place) throw new NotFoundException(
        `Place with id ${pid} does not exist`
      );

      await this.users.db.findOneAndUpdate(
        { _id: this.ID(uid) }, 
        { $pull: { "places": this.ID(pid) }}
      );
      await place.remove();
    } catch(error) {
      throw new NotFoundException(error.message);
    }
  }
}
