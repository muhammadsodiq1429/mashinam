import { ApiProperty } from "@nestjs/swagger";
import { UserGender } from "../../common/enums/user-gender";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    type: "string",
    example: "Ali Mahmud",
    description: "Foydalanuvchining to‘liq ismi",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    type: "string",
    example: "alimahmud@gmail.com",
    description: "Foydalanuvchining elektron pochta manzili",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: "string",
    example: "alimahmud",
    description: "Foydalanuvchining username",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  username: string;

  @ApiProperty({
    type: "string",
    example: "+998 90 312 8777",
    description: "Foydalanuvchining telefon raqami",
  })
  @IsPhoneNumber("UZ")
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    type: "string",
    example: "A3l1i2M-a8h7m-u7d7",
    description: "Foydalanuvchining paroli",
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    type: "string",
    example: "A3l1i2M-a8h7m-u7d7",
    description: "Foydalanuvchining tasdiqlovchi paroli",
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    type: "string",
    example: "male",
    enum: UserGender,
    description: "Foydalanuvchining jinsi",
  })
  @IsEnum(UserGender)
  @IsNotEmpty()
  gender: UserGender;
}
