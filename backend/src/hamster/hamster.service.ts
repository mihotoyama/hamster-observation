import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { HamsterDto } from './hamster.dto';
import { Hamster } from './hamster.entity';

@Injectable()
export class HamsterService {
  constructor(
    @InjectRepository(Hamster)
    private hamsterRepository: Repository<Hamster>
  ) {}

  async findLatest(): Promise<Hamster> {
    return await this.hamsterRepository.findOne({
      order: { id: 'DESC' }
    })
  }

  async findAll(): Promise<Hamster[]> {
    return await this.hamsterRepository.find();
  }

  async add(hamsterDto: HamsterDto): Promise<Hamster> {
    const wheelSpeed = await this.calcWheelSpeed(hamsterDto);
    const hamsterData = {
      ...hamsterDto,
      wheelSpeed: wheelSpeed,
    };
    return await this.hamsterRepository.save(hamsterData);
  }

  private async calcWheelSpeed(currentData: HamsterDto): Promise<number> {
    const beforeData = await this.hamsterRepository.findOne({
      order: { id: 'DESC' }
    })

    if (!beforeData) {
      return undefined;
    }

    // rpmを算出
    return (currentData.wheelCount - beforeData.wheelCount) / (this.nowtimeToDate(currentData.nowtime).getTime() - this.nowtimeToDate(beforeData.nowtime).getTime()) * 60;
  }

  private nowtimeToDate(nowtimeString: string): Date {
    const year = Number(nowtimeString.substring(0,4));
    const month = Number(nowtimeString.substring(4,6));
    const day = Number(nowtimeString.substring(6,8));
    const hour = Number(nowtimeString.substring(8,10));
    const min = Number(nowtimeString.substring(10,12));
    const sec = Number(nowtimeString.substring(12,14));

    return new Date(year, month, day, hour, min, sec);
  }

  private async deleteOld(): Promise<void> {
    this.hamsterRepository.delete({
      createdAt: Raw((createdAt) => `${createdAt} < datetime('now', 'localtime', '-30 minutes')`)
    })
  }

  @Cron('0 * * * * *')
  deleteOldCron() {
    this.deleteOld();
  }
}
