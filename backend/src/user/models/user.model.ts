import { 
  prop, modelOptions, plugin, pre, Ref
} from '@typegoose/typegoose';
import * as FindOrCreate from 'mongoose-findorcreate';
import * as AutoPopulate from 'mongoose-autopopulate';
import { AutoMap } from 'nestjsx-automapper';

import { hashPassword } from '../user.helper';
import { BaseModel, schemaOptions } from '../../shared';
import { PlacesModel } from '../../places';
import { Role } from '../../auth';


@plugin(AutoPopulate)
@plugin(FindOrCreate)
@modelOptions({ schemaOptions: { ...schemaOptions, collection: 'users' }})
@pre<UserModel>('save', async function(next) {
  if(!this.isNew) return next();

  try {
    this.password = await hashPassword(this.password);
    return next();
  } catch(error) { 
    next(error); 
  }
})
export class UserModel extends BaseModel<UserModel> {
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

  @prop({ enum: Role, default: Role.USER })
  @AutoMap()
  public role!: Role

  @AutoMap(() => PlacesModel)
  @prop({ autopopulate: true, ref: 'PlacesModel' })
  public places!: Ref<PlacesModel>[];
}