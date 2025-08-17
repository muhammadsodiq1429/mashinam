import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { CarModule } from "./car/car.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      autoLoadEntities: true,
      synchronize: true,
      url: process.env.DATABASE_URL,
    }),
    CarModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
