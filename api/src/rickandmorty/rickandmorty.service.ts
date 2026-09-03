import { Injectable } from '@nestjs/common';

export interface RickAndMortyApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

@Injectable()
export class RickandmortyService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api';

  private async fetchResource<T>(resource: string, params: string): Promise<RickAndMortyApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}/${resource}?${params}`);
    if (!response.ok) {
      throw new Error(`Rick and Morty API error: ${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<RickAndMortyApiResponse<T>>;
  }

  async getCharacters(page = 1, name?: string, status?: string): Promise<RickAndMortyApiResponse<any>> {
    const params = new URLSearchParams({ page: String(page) });
    if (name) params.set('name', name);
    if (status) params.set('status', status);
    return this.fetchResource('character', params.toString());
  }

  async getCharacterById(id: number): Promise<any> {
    const response = await fetch(`${this.baseUrl}/character/${id}`);
    if (!response.ok) {
      throw new Error(`Rick and Morty API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  async getLocations(page = 1): Promise<RickAndMortyApiResponse<any>> {
    return this.fetchResource('location', `page=${page}`);
  }

  async getLocationById(id: number): Promise<any> {
    const response = await fetch(`${this.baseUrl}/location/${id}`);
    if (!response.ok) {
      throw new Error(`Rick and Morty API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  async getEpisodes(page = 1): Promise<RickAndMortyApiResponse<any>> {
    return this.fetchResource('episode', `page=${page}`);
  }

  async getEpisodeById(id: number): Promise<any> {
    const response = await fetch(`${this.baseUrl}/episode/${id}`);
    if (!response.ok) {
      throw new Error(`Rick and Morty API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }
}
