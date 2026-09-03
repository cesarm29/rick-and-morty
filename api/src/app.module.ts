import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { RickandmortyModule } from './rickandmorty/rickandmorty.module.js';

@Module({
  imports: [RickandmortyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
