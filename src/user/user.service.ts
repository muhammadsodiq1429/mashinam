import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { BaseOkResponse } from "../common/response/200/base-ok-response";
import { checkUniqueFields } from "../common/helpers/is-exists";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async create(user: CreateUserDto) {
    const { password, confirm_password, username, email, phone_number } = user;

    const errors = await checkUniqueFields(this.userRepo, {
      email,
      username,
      phone_number,
    });

    if (errors.length > 0) {
      throw new ConflictException(errors);
    }

    if (password !== confirm_password) {
      throw new BadRequestException(
        "Password and confirm password don't match"
      );
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const newUser = await this.userRepo.save({
      ...user,
      hashed_password: hashedPassword,
    });

    return new BaseOkResponse(
      201,
      "New user created successfully",
      newUser,
      "newUser"
    );
  }

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User not found with ID ${id}`);
    }

    return user;
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
