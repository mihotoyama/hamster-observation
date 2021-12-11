import { IsNumber, IsNumberString, IsString } from "class-validator";

export class HamsterDto {
  @IsString()
  nowtime: string;

  @IsNumberString()
  weight: number;

  @IsNumberString()
  activeCount: number;

  @IsNumberString()
  temperature: number;

  @IsNumberString()
  wheelCount: number;

  @IsNumberString()
  houseCount: number;

  @IsNumberString()
  humidity: number;
}