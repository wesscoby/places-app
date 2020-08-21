import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { 
  ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse 
} from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '../guards';
import { Role } from '../models';


export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ 
      description: 'Unauthorized' 
    }),
    ApiForbiddenResponse({
      description: 'Forbidden resource'
    })
  );
}