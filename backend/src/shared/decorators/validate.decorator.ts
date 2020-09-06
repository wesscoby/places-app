import { applyDecorators, UsePipes } from '@nestjs/common';
import { Schema } from 'yup';
import { ApiBadRequestResponse } from '@nestjs/swagger';

import { YupValidationPipe } from '../pipes';

export function Validate<T>(schema: Schema<T>) {
  return applyDecorators(
    ApiBadRequestResponse({ description: 'Validation failed' }),
    UsePipes(new YupValidationPipe(schema))
  );
}
