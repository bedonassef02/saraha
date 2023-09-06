import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  @OnEvent('email.signIn')
  async handleSignInEvent(email: string): Promise<void> {
    const subject = 'Login Alert';
    const text = `Someone has logged into your saraha account. If this was not you, please change your password immediately.`;

    await this.sendMail(email, subject, text);
  }

  @OnEvent('email.signUp')
  async handleSignUpEvent(email: string): Promise<void> {
    const subject = 'Welcome to Saraha';
    const text =
      'Welcome to Saraha! You can now send messages anonymously and receive messages.';

    await this.sendMail(email, subject, text);
  }

  @OnEvent('message.receive')
  async handleMessageReceivedEvent({ toUser }): Promise<void> {
    const subject = 'New Message';
    const text = "You've received a new message. Please check your inbox.";
    console.log(toUser);

    await this.sendMail(toUser, subject, text);
  }

  async sendMail(email: string, subject: string, text: string): Promise<void> {
    await this.mailerService.sendMail({
      from: this.configService.get<string>('APP_EMAIL_PASSWORD'),
      to: email,
      subject,
      html: `<h2>${text}</h2>`,
    });
  }
}
