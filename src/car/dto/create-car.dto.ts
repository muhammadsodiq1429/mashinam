import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from "class-validator";
import { PrimaryGeneratedColumn, Column } from "typeorm";

export class CreateCarDto {
  @ApiProperty({
    type: "string",
    example: "Carnival",
    description: "Mashina nomi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: "number",
    example: 25000,
    description: "Mashina narxi(AQSH dollarida).",
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6 })
  @IsNotEmpty()
  @Min(0)
  price: number;

  @ApiProperty({
    type: "string",
    example: "KIA",
    description: "Mashina brendi",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  brand: string;

  @ApiProperty({ type: "string", example: "oq", description: "Mashina rangi" })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({
    type: "string",
    example: "2023-07-07",
    description: "Mashina ishlab chiqarilgan sanasi",
  })
  @IsDateString()
  @IsNotEmpty()
  releaseDate: Date;

  @ApiProperty({
    type: "number",
    example: 150,
    description: "Mashina ot kuchi(HP)",
  })
  @IsNumber()
  @IsNotEmpty()
  power: number;
}
