import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';


@Injectable()
export abstract class BaseService<T> {
  constructor(protected _model: ModelType<T>) {}
  
  async getAll(filter = {}): Promise<T[]> {
    const data = await this._model.find(filter);
    return data.map(item => item.toJSON());
  }

  async getOne(filter = {}): Promise<T> {
    const data = await this._model.findOne(filter);
    if(!data) throw new NotFoundException();
    return data.toJSON();
  }

  async getById(id: string): Promise<T> {
    const data = await this._model.findById(this.toObjectId(id));
    if(!data) throw new NotFoundException();
    return data.toJSON();
  }

  async delete(id: string): Promise<T> {
    const data =  await this._model.findByIdAndRemove(this.toObjectId(id));
    if(!data) throw new NotFoundException();
    return data.toJSON();
  }

  async clearCollection(filter = {}): Promise<{ ok?: number; n?: number; }> {
    return await this._model.deleteMany(filter);
  }

  private toObjectId(id: string): Types.ObjectId {
    return Types.ObjectId(id);
  }
}