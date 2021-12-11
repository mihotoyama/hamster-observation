import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { HamsterService } from './hamster.service';
import { HamsterController } from './hamster.controller';
import { Hamster } from './hamster.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hamster])],
  providers: [HamsterService],
  controllers: [HamsterController]
})
export class HamsterModule {}
