import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class NewOtpDto {
  @ApiProperty({
    type: "string",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: "string",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;
}
