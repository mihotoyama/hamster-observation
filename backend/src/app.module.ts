import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HamsterModule } from './hamster/hamster.module';

@Module({
  imports: [HamsterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
