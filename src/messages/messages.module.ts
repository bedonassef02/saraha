import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './entities/message.entity';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/messages',
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: '/v1/messages',
        method: RequestMethod.GET,
      },
      {
        path: '/v1/messages/:id',
        method: RequestMethod.GET,
      },
    );
  }
}
