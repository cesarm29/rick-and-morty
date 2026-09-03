# Rick & Morty API + Frontend

Proyecto que expone una API de microservicios con **NestJS** que consulta la
[API pública de Rick & Morty](https://rickandmortyapi.com), y un frontend
**Astro** responsive que la consume.

## Estructura

```
rick-and-morty/
├── api/        # API NestJS (backend)
└── frontend/   # Frontend Astro (responsive)
```

## API (NestJS)

La API expone los siguientes endpoints (prefijo global `/api`):

| Método | Ruta                    | Descripción                        |
| ------ | ----------------------- | ---------------------------------- |
| GET    | `/api/characters`       | Lista de personajes (paginado)     |
| GET    | `/api/characters/:id`   | Personaje por id                   |
| GET    | `/api/locations`        | Lista de localizaciones            |
| GET    | `/api/locations/:id`    | Localización por id                |
| GET    | `/api/episodes`         | Lista de episodios                 |
| GET    | `/api/episodes/:id`     | Episodio por id                    |
| GET    | `/health`               | Health check                       |

Parámetros de `/api/characters`:
- `page` (número): página a consultar
- `name` (texto): filtra por nombre
- `status` (`alive` | `dead` | `unknown`): filtra por estado

```bash
cd api
npm install
npm run start:dev   # http://localhost:3000
```

## Frontend (Astro)

Frontend responsive con búsqueda, filtro por estado y paginación de personajes.

```bash
cd frontend
npm install
npm run dev         # http://localhost:4321
```

Variable de entorno `PUBLIC_API_URL` indica dónde está la API
(por defecto apunta a `http://localhost:3000`).

## Despliegue

Cada subproyecto se despliega por separado en Vercel:

- `api/` como proyecto Vercel (zero-config para NestJS)
- `frontend/` como proyecto Vercel (adaptador `@astrojs/vercel`)
