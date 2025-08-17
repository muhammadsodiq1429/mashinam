import { ApiProperty } from "@nestjs/swagger";
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export class BaseEntity {
  @ApiProperty({
    type: "number",
    example: 1,
    description:
      "Mashina uchun takrorlanmas ID, database yoki backend qismida avtomatik yaratiladi",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: "string",
    example: "2025-08-17T09:27:00.000Z",
    description: `Ma'lumot databasega saqlangan vaqt, database yoki backend qismida avtomatik yaratiladi`,
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    type: "string",
    example: "2025-08-17T09:27:00.000Z",
    description: `Ma'lumot yangilangan vaqt, database yoki backend qismida avtomatik yaratiladi`,
  })
  @UpdateDateColumn()
  updated_at: Date;
}
