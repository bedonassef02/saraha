import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UsersService } from "../../users/users.service";
import { User } from "../../users/entities/user.entity";

@Injectable()
export class ReceiveMessageInterceptor implements NestInterceptor {
  constructor(
    private eventEmitter: EventEmitter2,
    private usersService: UsersService
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    return next.handle().pipe(
      tap(async () => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        if (statusCode === 201) {
          const request = context.switchToHttp().getRequest();
          const { toUser, showUser } = request.body;
          let fromUser: User | undefined;

          if (showUser) {
            const email = request.body.fromUser;
            fromUser = await this.usersService.findOne(email);
          }

          const user: User | undefined = await this.usersService.findOne(toUser);

          if (user) {
            const fromUsername = fromUser?.username || "Unknown";

            this.eventEmitter.emit("message.receive", {
              toUser: user.email,
              fromUser: fromUsername,
              userId: toUser,
            });
          }
        }
      })
    );
  }
}
