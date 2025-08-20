import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "./entities/car.entity";
import { Repository } from "typeorm";
import { BaseOkResponse } from "../common/response/200/base-ok-response";

@Injectable()
export class CarService {
  constructor(@InjectRepository(Car) private carRepo: Repository<Car>) {}
  create(createCarDto: CreateCarDto) {
    return this.carRepo.save(createCarDto);
  }

  findAll() {
    return this.carRepo.find();
  }

  async findOne(id: number) {
    const car = await this.carRepo.findOneBy({ id });
    if (!car) {
      throw new NotFoundException(`Car not found with ID ${id}`);
    }

    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const updatedCar = await this.carRepo.save({
      ...(await this.findOne(id)),
      ...updateCarDto,
    });

    return new BaseOkResponse(
      200,
      `Car with ID ${id} updated successfully`,
      updatedCar,
      "updatedCar"
    );
  }

  async remove(id: number) {
    const car = await this.findOne(id);
    await this.carRepo.remove(car);

    return new BaseOkResponse(
      200,
      `Car with ID ${id} deleted successfully`,
      car,
      "deletedCar"
    );
  }
}
