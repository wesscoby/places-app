import { 
  prop, modelOptions, plugin, pre, Ref
} from '@typegoose/typegoose';
import * as FindOrCreate from 'mongoose-findorcreate';
import * as AutoPopulate from 'mongoose-autopopulate';
import { AutoMap } from 'nestjsx-automapper';

import { hashPassword } from './user.helper';
import { BaseModel, schemaOptions } from '../shared';
import { Place } from '../places';


@plugin(AutoPopulate)
@plugin(FindOrCreate)
@modelOptions({ schemaOptions })
@pre<User>('save', async function(next) {
  if(!this.isNew) return next();

  try {
    this.password = await hashPassword(this.password);
    return next();
  } catch(error) { 
    next(error); 
  }
})
class User extends BaseModel<User> {
  @prop()
  @AutoMap()
  public name!: string;

  @prop({ unique: true, index: true, lowercase: true })
  @AutoMap()
  public email!: string;

  @prop()
  public password!: string;

  @prop()
  @AutoMap()
  public avatar?: string;

  @AutoMap(() => Place)
  @prop({ autopopulate: true, ref: 'Place' })
  public places!: Ref<Place>[];
}

export { User };