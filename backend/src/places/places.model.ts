import { 
  prop, modelOptions, plugin, Ref
} from '@typegoose/typegoose';
import * as FindOrCreate from 'mongoose-findorcreate';
import * as AutoPopulate from 'mongoose-autopopulate';
import { AutoMap  } from 'nestjsx-automapper';

import { User } from '../user';
import { BaseModel, schemaOptions } from '../shared';

export class Location {
  @AutoMap()
  @prop()
  public lat!: number;

  @AutoMap()
  @prop()
  public lng!: number;
}


@plugin(FindOrCreate)
@plugin(AutoPopulate)
@modelOptions({ schemaOptions })
class Place extends BaseModel<Place> {
  @AutoMap()
  @prop()
  public title!: string;

  @AutoMap()
  @prop()
  public description!: string;

  @AutoMap()
  @prop()
  public address!: string;

  @AutoMap(() => Location)
  @prop({ _id: false })
  public location!: Location;

  @AutoMap()
  @prop()
  public image?: string;

  @AutoMap(() => User)
  @prop({ ref: User, autopopulate: true })
  public creator!: Ref<User>;
}

export { Place };