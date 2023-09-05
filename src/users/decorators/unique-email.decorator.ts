import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const IsEmailExist = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request.body.email);
    return request.body.email;
  },
);
