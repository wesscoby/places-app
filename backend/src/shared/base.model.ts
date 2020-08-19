import { prop, defaultClasses as DC } from '@typegoose/typegoose';
import { SchemaOptions } from 'mongoose';
import { AutoMap } from 'nestjsx-automapper';


interface BaseModel<T> extends DC.TimeStamps {}
abstract class BaseModel<T> extends DC.FindOrCreate {
    @AutoMap()
    public readonly id!: string;

    @prop()
    @AutoMap()
    createdAt!: Date;

    @prop()
    @AutoMap()
    updatedAt!: Date;
}
export { BaseModel }

export const schemaOptions: SchemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true, getters: true
  },
};