import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ActiveUserDto {
  @ApiProperty({ type: "number" })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
