import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "../user/entities/user.entity";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { Sign } from "crypto";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(user: { email: string; full_name: string; otp: string }) {
    console.log(user.full_name);
    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welcome to Mashinam app",
      template: "./confirmation",
      context: {
        name: user.full_name,
        otp: user.otp,
        year: new Date().getFullYear(),
      },
    });
  }
}
