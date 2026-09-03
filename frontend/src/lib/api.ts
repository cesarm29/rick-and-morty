export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Paginated<T> {
  info: Info;
  results: T[];
}

export function getApiBaseUrl(): string {
  return (
    import.meta.env.PUBLIC_API_URL ??
    'http://localhost:3000'
  ).replace(/\/$/, '');
}

export async function getCharacters(params: {
  page?: number;
  name?: string;
  status?: string;
} = {}): Promise<Paginated<Character>> {
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  if (params.name) qs.set('name', params.name);
  if (params.status) qs.set('status', params.status);

  const res = await fetch(`${getApiBaseUrl()}/api/characters${qs.toString() ? `?${qs}` : ''}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}
