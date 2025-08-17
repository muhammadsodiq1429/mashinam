import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BaseEntity } from "../../common/base-entity";

@Entity()
export class Car extends BaseEntity {
  @ApiProperty({
    type: "string",
    example: "Carnival",
    description: "Mashina nomi",
  })
  @Column()
  name: string;

  @ApiProperty({
    type: "number",
    example: 25000,
    description: "Mashina narxi(AQSH dollarida).",
  })
  @Column()
  price: number;

  @ApiProperty({
    type: "string",
    example: "KIA",
    description: "Mashina brendi",
  })
  @Column()
  brand: string;

  @ApiProperty({ type: "string", example: "oq", description: "Mashina rangi" })
  @Column()
  color: string;

  @ApiProperty({
    type: "string",
    example: "2023-07-07",
    description: "Mashina ishlab chiqarilgan sanasi",
  })
  @Column()
  releaseDate: Date;

  @ApiProperty({
    type: "number",
    example: 150,
    description: "Mashina ot kuchi(HP)",
  })
  @Column()
  power: number;
}
