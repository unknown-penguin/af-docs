# AF Docs

Українська технічна документація для `af_app` і `af_api`.

Проєкт побудований на Next.js, Fumadocs, MDX, Mermaid, PlantUML/C4 і Kroki. Він документує поточну реалізацію мобільного Flutter застосунку, FastAPI backend, інтеграції Telegram/Firebase, PostgreSQL схему та основні runtime-потоки.

## Вимоги

- Node.js 22+
- pnpm 10+
- Docker і Docker Compose v2 для контейнерного запуску
- Python environment backend-проєкту `../af_api/.venv` для оновлення OpenAPI schema з FastAPI

## Локальний запуск

```powershell
cd af-docs
pnpm install
pnpm build:openapi
pnpm dev
```

Docs будуть доступні на `http://localhost:3000`.

`pnpm build:openapi` імпортує FastAPI app з `../af_api`, викликає `app.openapi()` і генерує статичні сторінки API reference. Для цього потрібен валідний `af_api/.env`, але генератор не запускає API server і не виконує lifespan startup.

## Docker development

```powershell
cd af-docs
pnpm dev:docker
```

Команда піднімає:

- `docs` на `http://localhost:3000`
- `kroki` на `http://localhost:8000`

Зупинка:

```powershell
pnpm stop:docker
```

## Production Docker

```powershell
docker compose -f docker-compose.prod.yml up -d --build
```

Production image використовує `apps/docs/Dockerfile.prod`, standalone Next output і локальний Kroki service. У runtime image копіюється `diagrams/`, а `DIAGRAMS_DIR=/app/diagrams` вказує API route, звідки читати PlantUML/Mermaid файли.

## Корисні змінні середовища

- `API_RES_PATH=openapi` - розділ docs, куди генерується API reference.
- `AF_API_ROOT=../../../af_api` - шлях від `apps/docs` до FastAPI backend.
- `AF_API_PYTHON=...` - явний шлях до Python interpreter, якщо не треба використовувати `af_api/.venv`.
- `AF_OPENAPI_SKIP_EXPORT=true` - пропустити імпорт FastAPI app і використати вже згенерований `apps/docs/openapi/af-api.json`.
- `KROKI_BASE_URL=http://localhost:8000` - URL Kroki renderer.
- `DIAGRAMS_DIR=...` - директорія з `.puml`, `.mmd`, `.dot` файлами для `/api/diagram`.

## Структура

```text
af-docs/
  apps/docs/content/docs/      MDX сторінки
  apps/docs/diagrams/          PlantUML, C4, Mermaid, ERD
  apps/docs/openapi/           AF OpenAPI schema
  apps/docs/scripts/           OpenAPI export та docs generation
  docker-compose.dev.yml       Development stack
  docker-compose.prod.yml      Production stack
```

## Перевірка

```powershell
pnpm build:openapi
pnpm build
pnpm dev
```

Для Docker:

```powershell
pnpm dev:docker
```
