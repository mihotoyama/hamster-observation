import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
