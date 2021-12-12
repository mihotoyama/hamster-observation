import { IsNumber, IsString } from "class-validator";

export class HamsterDto {
  @IsString()
  nowtime: string;

  @IsNumber()
  weight: number;

  @IsNumber()
  activeCount: number;

  @IsNumber()
  temperature: number;

  @IsNumber()
  wheelCount: number;

  @IsNumber()
  houseCount: number;

  @IsNumber()
  humidity: number;
}