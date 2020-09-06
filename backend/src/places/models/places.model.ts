import { 
  prop, modelOptions, plugin, Ref
} from '@typegoose/typegoose';
import * as FindOrCreate from 'mongoose-findorcreate';
import * as AutoPopulate from 'mongoose-autopopulate';
import { AutoMap  } from 'nestjsx-automapper';

import { UserModel } from '../../user';
import { BaseModel, schemaOptions } from '../../shared';


export class CoordinatesModel {
  @AutoMap()
  @prop()
  public lat!: number;

  @AutoMap()
  @prop()
  public lng!: number;
}

@plugin(FindOrCreate)
@plugin(AutoPopulate)
@modelOptions({ schemaOptions: { ...schemaOptions, collection: 'places' }})
export class PlacesModel extends BaseModel<PlacesModel> {
  @AutoMap()
  @prop()
  public title!: string;

  @AutoMap()
  @prop()
  public description!: string;

  @AutoMap()
  @prop()
  public address!: string;

  @AutoMap(() => CoordinatesModel)
  @prop({ _id: false })
  public coordinates!: CoordinatesModel;

  @AutoMap()
  @prop()
  public image!: string;

  @AutoMap(() => UserModel)
  @prop({ 
    ref: UserModel, 
    autopopulate: { select: 'id name email avatar', maxDepth: 1 }
  })
  public creator!: Ref<UserModel>;
}