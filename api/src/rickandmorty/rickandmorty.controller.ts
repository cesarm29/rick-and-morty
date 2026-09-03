import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { RickandmortyService } from './rickandmorty.service.js';

@Controller()
export class RickandmortyController {
  constructor(private readonly service: RickandmortyService) {}

  @Get('characters')
  async getCharacters(
    @Query('page') page?: string,
    @Query('name') name?: string,
    @Query('status') status?: string,
  ) {
    return this.wrap(() =>
      this.service.getCharacters(page ? Number(page) : 1, name, status),
    );
  }

  @Get('characters/:id')
  getCharacterById(@Param('id') id: string) {
    return this.wrap(() => this.service.getCharacterById(Number(id)));
  }

  @Get('locations')
  getLocations(@Query('page') page?: string) {
    return this.wrap(() => this.service.getLocations(page ? Number(page) : 1));
  }

  @Get('locations/:id')
  getLocationById(@Param('id') id: string) {
    return this.wrap(() => this.service.getLocationById(Number(id)));
  }

  @Get('episodes')
  getEpisodes(@Query('page') page?: string) {
    return this.wrap(() => this.service.getEpisodes(page ? Number(page) : 1));
  }

  @Get('episodes/:id')
  getEpisodeById(@Param('id') id: string) {
    return this.wrap(() => this.service.getEpisodeById(Number(id)));
  }

  private async wrap<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (err) {
      const statusStr = (err as any)?.message?.match(/(\d{3})/)?.[1];
      const status = statusStr ? Number(statusStr) : HttpStatus.INTERNAL_SERVER_ERROR;
      if (status === HttpStatus.NOT_FOUND) {
        throw new HttpException({ error: 'Recurso no encontrado' }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        { error: (err as any)?.message || 'Error interno' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
