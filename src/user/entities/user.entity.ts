import {} from "@nestjs/typeorm";
import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../common/base-entity";
import { UserGender } from "../../common/enums/user-gender";
import { ApiProperty } from "@nestjs/swagger";
import * as uuid from "uuid";

@Entity()
export class User extends BaseEntity {
  @ApiProperty({
    type: "string",
    example: "Ali Mahmud",
    description: "Foydalanuvchining to‘liq ismi",
  })
  @Column()
  full_name: string;

  @ApiProperty({
    type: "string",
    example: "alimahmud@gmail.com",
    description: "Foydalanuvchining elektron pochta manzili",
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    type: "string",
    example: "alimahmud",
    description: "Foydalanuvchining username",
  })
  @Column({
    unique: true,
  })
  username: string;

  @ApiProperty({
    type: "string",
    example: "+998 90 312 8777",
    description: "Foydalanuvchining telefon raqami",
  })
  @Column({ unique: true })
  phone_number: string;

  @ApiProperty({
    type: "string",
    example: "hashed_password_with_bcrypt",
    description: "Foydalanuvchining hashlangan paroli",
  })
  @Column()
  hashed_password: string;

  @ApiProperty({
    type: "string",
    example: "male",
    enum: UserGender,
    description: "Foydalanuvchining jinsi",
  })
  @Column({ enum: UserGender })
  gender: UserGender;

  @ApiProperty({
    type: "boolean",
    example: false,
    default: false,
    description: "Foydalanuvchining faolligi",
  })
  @Column({ default: false })
  is_active: boolean;
}
