import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          service: configService.get<string>('APP_SERVICE_NAME'),
          auth: {
            user: configService.get<string>('APP_EMAIL_ADDRESS'),
            pass: configService.get<string>('APP_EMAIL_PASSWORD'),
          },
        },
      }),
    }),
  ],
  providers: [EmailService],
})
export class EmailModule {}
