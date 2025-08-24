import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { BaseOkResponse } from "../common/response/200/base-ok-response";
import { checkUniqueFields } from "../common/helpers/is-exsits";
import { Otp } from "./entities/otp.entity";
import { decode, encode } from "../common/helpers/crypto";
import * as otpGenerator from "otp-generator";
import { addMinutesToDate } from "../common/helpers/addMinutes";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { ActiveUserDto } from "./dto/user-active.dto";
import { sendmail } from "../mail/mail.service";
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Otp) private otpRepo: Repository<Otp>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const {
      password,
      /* confirm_password, */ username,
      email,
      phone_number,
      full_name,
    } = createUserDto;

    const errors = await checkUniqueFields(this.userRepo, {
      email,
      username,
      phone_number,
    });

    if (errors.length > 0) {
      throw new ConflictException(errors);
    }

    // const otp = await this.newOtp({ email, full_name });

    const hashedPassword = await bcrypt.hash(password, 7);
    const newUser = await this.userRepo.save({
      ...createUserDto,
      hashed_password: hashedPassword,
    });

    return new BaseOkResponse(
      201,
      "New user created successfully",
      // { newUser, otp },
      // "data"
      newUser,
      "newUser"
    );
  }

  async newOtp(userEmailDto: { email: string; full_name: string }) {
    const { email, full_name } = userEmailDto;
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const now = new Date();
    const expiration_time = addMinutesToDate(now, 5);
    await this.otpRepo.delete({ email });
    const newOtpData = await this.otpRepo.save({
      otp,
      email,
      expiration_time,
    });

    const details = {
      timestamp: now,
      email,
      otp_id: newOtpData.id,
    };

    const encodedData = await encode(JSON.stringify(details));
    console.log(full_name);
    try {
      await sendmail({ email, full_name, otp });
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException(
        "Emailga xat yuborishda xatolik",
        error.message
      );
    }

    return {
      message: "OTP emailga yuborildi",
      verification_key: encodedData,
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { verificationKey, email, otp } = verifyOtpDto;

    const currentDate = new Date();
    const decodedDate = await decode(verificationKey);
    const details = JSON.parse(decodedDate);
    if (details.email != email)
      throw new BadRequestException("OTP bu eamilga yuborilmagan");

    const resultOtp = await this.otpRepo.findOneBy({ id: details.otp_id });

    if (resultOtp == null) throw new BadRequestException("Bunday OTP yo'q");
    if (resultOtp.verified)
      throw new BadRequestException("OTP avval tekshirilgan");
    if (resultOtp.expiration_time < currentDate)
      throw new BadRequestException("Bu OTP'ning vaqti tugagan");
    if (resultOtp.otp != otp) throw new BadRequestException("OTP mos emas");

    const user = await this.userRepo.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(`User not found with email ${email}`);
    }
    await this.userRepo.save({ ...user, is_active: true });

    if (!user)
      throw new BadRequestException("Bunday emaillik foydalanuvchi yo'q");

    await this.otpRepo.update({ id: details.otp_id }, { verified: true });

    return { message: "🎉 Tabriklayman, siz active bo'ldingiz" };
  }

  findAll() {
    return this.userRepo.find({
      select: {
        email: true,
        full_name: true,
        gender: true,
        id: true,
        is_active: true,
        phone_number: true,
        username: true,
      },
    });
  }

  async activeUser({ id }: ActiveUserDto) {
    const user = await this.findOne(id);
    if (user.is_active) "User activated successfully";
    await this.userRepo.save({ ...user, is_active: true });

    return "User activated successfully";
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User not found with ID ${id}`);
    }

    return user;
  }

  findOneUserByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  async update(id: number, user: UpdateUserDto) {
    const updatedUser = await this.userRepo.save({
      ...(await this.findOne(id)),
      ...user,
    });

    return new BaseOkResponse(
      200,
      `User with ID ${id} updated successfully`,
      updatedUser,
      "updatedUser"
    );
  }

  async remove(id: number) {
    const deletedUser = await this.findOne(id);
    await this.userRepo.remove(deletedUser);

    return new BaseOkResponse(
      200,
      `User with ID ${id} deleted successfully`,
      deletedUser,
      "deletedUser"
    );
  }
}
