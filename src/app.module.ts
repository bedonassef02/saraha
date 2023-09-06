import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { configSchemaValidation } from './common/validation/config-schema.validation';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { NotificationsModule } from './notifications/notifications.module';
import { EmailModule } from './email/email.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProfileModule } from './profile/profile.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      validationSchema: configSchemaValidation,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    MessagesModule,
    NotificationsModule,
    EmailModule,
    EventEmitterModule.forRoot(),
    ProfileModule,
  ],
  providers: [],
})
export class AppModule {}
