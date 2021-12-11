import { Body, Controller, HttpCode, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { HamsterDto } from './hamster.dto';
import { HamsterResponse } from './hamster.response';
import { HamsterService } from './hamster.service';

@Controller('hamster')
export class HamsterController {
  constructor(private readonly service: HamsterService){}

  @Post()
  async add(@Body() hamsterDto: HamsterDto){
    return await this.service.add(hamsterDto).then((hamster) => {
      const hamsterResponse: HamsterResponse = {
        nowtime: hamster.nowtime,
        weight: hamster.weight,
        activeCount: hamster.activeCount,
        temperature: hamster.temperature,
        wheelCount: hamster.wheelCount,
        houseCount: hamster.houseCount,
        humidity: hamster.humidity
      }
      return hamsterResponse;
    }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    })
  }
}
