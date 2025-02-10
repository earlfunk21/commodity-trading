import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend: Resend;

  constructor(private readonly configService: ConfigService) {
    const resendApiKey =
      this.configService.getOrThrow<string>('RESEND_API_KEY');
    this.resend = new Resend(resendApiKey);
  }

  async send(email: string, subject: string, html: string) {
    const from = this.configService.getOrThrow<string>('RESEND_FROM_EMAIL');
    const response = await this.resend.emails.send({
      from,
      to: [email],
      subject,
      html,
    });
    if (response.error) {
      throw new InternalServerErrorException(
        'Error sending email: ' + response.error.message,
      );
    }
  }
}
