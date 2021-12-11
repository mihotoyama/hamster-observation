import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HamsterModule } from './hamster/hamster.module';

@Module({
  imports: [TypeOrmModule.forRoot(), HamsterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
