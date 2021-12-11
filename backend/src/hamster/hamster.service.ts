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

  async add(hamsterDto: HamsterDto): Promise<Hamster> {
    return await this.hamsterRepository.save(hamsterDto);
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
