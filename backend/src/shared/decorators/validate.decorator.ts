import { applyDecorators, UsePipes } from '@nestjs/common';
import { ObjectSchema } from 'joi';

import { JoiValidationPipe } from '../pipes';

export function Validate(schema: ObjectSchema) {
  return applyDecorators(
    UsePipes(new JoiValidationPipe(schema))
  );
}
