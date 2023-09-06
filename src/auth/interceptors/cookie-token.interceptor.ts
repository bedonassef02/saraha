import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CookieTokenInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      tap((data) => {
        if (data.token) {
          const cookieTokenMaxAge: number = this.configService.get<number>(
            'COOKIE_TOKEN_MAX_AGE',
          );
          response.cookie('token', data.token, {
            maxAge: cookieTokenMaxAge * 24 * 60 * 60 * 1000,
          });
        }
      }),
    );
  }
}
