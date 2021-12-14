import { Body, Controller, Get, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { HamsterDto } from './hamster.dto';
import { Hamster } from './hamster.entity';
import { HamsterResponse, HamsterResponseList } from './hamster.response';
import { HamsterService } from './hamster.service';

@Controller('hamster-observation')
export class HamsterController {
  constructor(private readonly service: HamsterService){}

  @Get('/realtime-cawaii-bo')
  async findLatest(){
    return await this.service.findLatest().then((latestData) => {
      return this.setHamsterResponse(latestData);
    }).catch(() => {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    })
  }

  @Get('/realtime-cawaii-bo/all')
  async findAll(){
    return await this.service.findAll().then((allData) => {
      return this.setHamsterResponseList(allData);
    }).catch(() => {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    })
  }

  @Post('/realtime-cawaii-bo')
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
      humidity: resolved.humidity,
      wheelSpeed: resolved.wheelSpeed,
    }
    return hamsterResponse;
  }

  private setHamsterResponseList(resolved: Hamster[]) {
    const hamsterResponseList = resolved.map((data) => {
      const hamsterResponse: HamsterResponse = {
        nowtime: data.nowtime,
        weight: data.weight,
        activeCount: data.activeCount,
        temperature: data.temperature,
        wheelCount: data.wheelCount,
        houseCount: data.houseCount,
        humidity: data.humidity,
        wheelSpeed: data.wheelSpeed,
      }
      return hamsterResponse;
    })
    return { allData: hamsterResponseList };
  }
}
