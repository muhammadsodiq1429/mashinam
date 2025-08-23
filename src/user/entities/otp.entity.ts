import { Column, Entity, PrimaryColumn } from "typeorm";
import { BaseEntity } from "../../common/base-entity";

@Entity()
export class Otp extends BaseEntity {
  @Column()
  email: string;

  @Column()
  otp: string;

  @Column()
  expiration_time: Date;

  @Column({ default: false })
  verified: boolean;
}
