import { 
  prop, defaultClasses as DC, modelOptions, plugin, Ref
} from '@typegoose/typegoose';
import * as FindOrCreate from 'mongoose-findorcreate';
import * as AutoPopulate from 'mongoose-autopopulate';
import { AutoMap  } from 'nestjsx-automapper';

import { User } from '../user/user.model';
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
}

export { Place };