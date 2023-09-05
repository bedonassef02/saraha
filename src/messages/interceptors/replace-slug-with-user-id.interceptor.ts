import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/users.service';

@Injectable()
export class ReplaceSlugWithUserIdInterceptor implements NestInterceptor {
  constructor(private readonly usersService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const slug: string = request.params.id;

    const user: any = await this.usersService.findUserBySlug(slug);

    if (!user) throw new NotFoundException('url not found');
    request.params.id = user._id;
    request.body.toUser = user._id.toString();
    return next.handle();
  }
}
