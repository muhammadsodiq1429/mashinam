import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { NewOtpDto } from "./dto/new-otp.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "To add a new user" })
  @ApiResponse({
    status: 201,
    type: User,
    description: "The new user added successfully",
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: "To create a new otp for user" })
  @ApiResponse({
    status: 200,
    description: "🎉OTP emailga yuborildi",
  })
  // @HttpCode(200)
  @Post("new-otp")
  newOtp(@Body() newOtpDto: NewOtpDto) {
    return this.userService.newOtp(newOtpDto);
  }

  @ApiOperation({ summary: "To verify user's otp" })
  @ApiResponse({
    status: 200,
    description: "🎉 Tabriklayman, siz active bo'ldingiz",
  })
  // @HttpCode(200)
  @Post("verify-otp")
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.userService.verifyOtp(verifyOtpDto);
  }

  @ApiOperation({ summary: "To get all users" })
  @ApiResponse({
    status: 200,
    type: User,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: "To get one user by ID" })
  @ApiResponse({
    status: 200,
    type: User,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: "To update one user by ID" })
  @ApiResponse({
    status: 200,
    type: User,
    description: "The user with ID 1 updated successfully",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: "To delete one user by ID" })
  @ApiResponse({
    status: 200,
    type: User,
    description: "The user with ID 1 deleted successfully",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
