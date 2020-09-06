import { applyDecorators, UsePipes } from '@nestjs/common';
import { Schema } from 'yup';

import { YupValidationPipe } from '../pipes';

export function Validate<T>(schema: Schema<T>) {
  return applyDecorators(
    UsePipes(new YupValidationPipe(schema))
  );
}
