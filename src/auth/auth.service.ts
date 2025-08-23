import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { UserService } from "../user/user.service";
import { BaseOkResponse } from "../common/response/200/base-ok-response";
import { SignInUserDto } from "./dto/sign-in-user.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signUpUser(createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);

    return new BaseOkResponse(
      201,
      "New user signed up successfully",
      newUser,
      "newUser"
    );
  }

  async singInUser(signInUserDto: SignInUserDto) {
    const { email, password } = signInUserDto;

    const user = await this.userService.findOneUserByEmail(email);
    if (!user) throw new BadRequestException("Email or password incorrect");

    const { hashed_password, id, is_active } = user;

    const isValidPassword = await bcrypt.compare(password, hashed_password);
    if (!isValidPassword)
      throw new BadRequestException("Email or password incorrect");

    const accessToken = this.jwtService.sign(
      {
        id: id,
        is_active: is_active,
      },
      { expiresIn: "5h", secret: "ACCESS_TOKEN_KEY" }
    );

    const refreshToken = this.jwtService.sign(
      {
        id: id,
        is_active: is_active,
      },
      { expiresIn: "5d", secret: "REFRESH_TOKEN_KEY" }
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
