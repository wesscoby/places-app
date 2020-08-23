import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Role } from '../models';


export const ReqUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    
    return data ? user && user[data] : user;
  },
);

export const IsAdmin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const role = request.user.role;
    return role === Role.ADMIN;
  }
)