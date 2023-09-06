import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class ShowUserInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const showSender = request.body?.showSender || false;
    const token = request.cookies['token'];

    let user;
    if (token) {
      user = await this.authService.decodeToken(token);
      if (!user)
        throw new UnauthorizedException('you cannot send messages to yourself');
      const { id } = request.params;
      if (user.id === id.toString()) {
        throw new BadRequestException('you cannot send messages to yourself');
      }
    }
    if (showSender && token) {
      request.body.fromUser = user.id;
    } else if (showSender) {
      throw new UnauthorizedException('You are not authorized');
    } else {
      request.body.showUser = false;
      request.body.fromUser = null;
    }
    return next.handle();
  }
}
