import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Otp } from "./entities/otp.entity";
// import { MailModule } from "../mail/mail.module";

@Module({
  imports: [TypeOrmModule.forFeature([User, Otp]) /* MailModule */],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
