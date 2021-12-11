import { Body, Controller, Get, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { HamsterDto } from './hamster.dto';
import { Hamster } from './hamster.entity';
import { HamsterResponse } from './hamster.response';
import { HamsterService } from './hamster.service';

@Controller('hamster')
export class HamsterController {
  constructor(private readonly service: HamsterService){}

  @Get()
  async findLatest(){
    return await this.service.findLatest().then((hamster) => {
      return this.setHamsterResponse(hamster);
    }).catch(() => {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    })
  }

  @Post()
  async add(@Body() hamsterDto: HamsterDto, @Req() req: Request){

    // M5stackが接続しているネットワークのIPアドレスにする
    if (req.ip !== '::1') {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }

    return await this.service.add(hamsterDto).then((hamster) => {
      return this.setHamsterResponse(hamster);
    }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    })
  }

  private setHamsterResponse(resolved: Hamster) {
    const hamsterResponse: HamsterResponse = {
      nowtime: resolved.nowtime,
      weight: resolved.weight,
      activeCount: resolved.activeCount,
      temperature: resolved.temperature,
      wheelCount: resolved.wheelCount,
      houseCount: resolved.houseCount,
      humidity: resolved.humidity
    }
    return hamsterResponse;
  }
}
