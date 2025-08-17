import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { CarService } from "./car.service";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Car } from "./entities/car.entity";

@Controller("car")
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiOperation({ summary: "To add a new car" })
  @ApiResponse({
    status: 201,
    type: Car,
    description: "The new car added successfully",
  })
  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @ApiOperation({ summary: "To get all cars" })
  @ApiResponse({
    status: 200,
    type: Car,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.carService.findAll();
  }

  @ApiOperation({ summary: "To get one car by ID" })
  @ApiResponse({
    status: 200,
    type: Car,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.carService.findOne(id);
  }

  @ApiOperation({ summary: "To update one car by ID" })
  @ApiResponse({
    status: 200,
    type: Car,
    description: "The car with ID 1 updated successfully",
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCarDto: UpdateCarDto
  ) {
    return this.carService.update(id, updateCarDto);
  }

  @ApiOperation({ summary: "To delete one car by ID" })
  @ApiResponse({
    status: 200,
    type: Car,
    description: "The car with ID 1 deleted successfully",
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.carService.remove(id);
  }
}
