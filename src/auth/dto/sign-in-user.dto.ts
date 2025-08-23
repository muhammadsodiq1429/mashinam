import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInUserDto {
  @ApiProperty({ type: "string" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: "string" })
  @IsString()
  @IsNotEmpty()
  password: string;
}
