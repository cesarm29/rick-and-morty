import { Module } from '@nestjs/common';
import { RickandmortyController } from './rickandmorty.controller.js';
import { RickandmortyService } from './rickandmorty.service.js';

@Module({
  controllers: [RickandmortyController],
  providers: [RickandmortyService],
  exports: [RickandmortyService],
})
export class RickandmortyModule {}
