import {
  PipeTransform, Injectable, ArgumentMetadata, BadRequestException
} from '@nestjs/common';
import { Schema } from 'yup';

@Injectable()
export class YupValidationPipe<T> implements PipeTransform {
  constructor(private schema: Schema<T>) {}

  async transform(value: T, { type }: ArgumentMetadata) {
    try {
      if(type === 'body') {
        await this.schema.validate(value, { abortEarly: true });
        return value;
      } else {
        return value
      }
    } catch(error) {
      throw new BadRequestException(`Validation failed: ${error.message}`);
    }
  }
}