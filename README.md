# Web App — React + TypeScript + Vite

Современное одностраничное приложение на React 19 и Vite 7 с TypeScript, Tailwind и Ant Design. Проект собирается в Docker и разворачивается через Nginx, поддерживает SPA‑роутинг (`react-router`).

## Стек
- **React 19**, **TypeScript 5**, **Vite 7**
- **React Router 7**, **React Query 5**
- **Ant Design 5**, **Tailwind CSS 4**
- **Nginx** для отдачи статики и SPA‑fallback

## Возможности
- Структурированные страницы: `dashboard`, `monitoring`, `patients`, `settings`, `about`
- Компоненты `MenuBar`, `Layout`, UI‑элементы (поиск/сортировка)
- Типобезопасные модели и схемы в `src/models` и `zod`
- Готовность к контейнеризации и деплою

## Требования
- Node.js 20+
- Docker 24+ (для контейнеризации)

## Запуск локально (без Docker)
```bash
npm ci
npm run dev
# откройте http://localhost:5173
```

Для прод‑сборки локально:
```bash
npm run build        # tsc -b && vite build (строгая проверка типов)
npm run preview      # локальный предпросмотр сборки
```

## Docker: сборка и запуск

Проект содержит многостадийный Dockerfile: сборка фронтенда и запуск через **Nginx** с корректным SPA‑fallback.

```bash
# 1) Собрать образ
docker build -t web-app-nginx .

# 2) Запустить контейнер
docker run --rm -p 8080:80 web-app-nginx

# Откройте: http://localhost:8080
```

> Примечание: В сборке используется `vite build`. Если в вашем CI нужен строгий типчек — запускайте его отдельно командой `npm run typecheck` (см. ниже раздел «Типизация/проверки»).

## Переменные окружения (.env)
Vite подхватывает переменные из файлов `.env*`, но только те, что начинаются с префикса `VITE_`.

- Поддерживаемые файлы: `.env`, `.env.local`, `.env.development`, `.env.production` (и их `.local`‑варианты). Подробнее — в документации Vite.
- Все переменные, которые должны быть доступны в клиентском коде (`import.meta.env`), обязаны начинаться с `VITE_`.

Создайте `.env` на основе примера:

```bash
cp .env.example .env
# отредактируйте значения под вашу среду
```

Пример содержимого (`.env.example` уже добавлен в проект):
```dotenv
# Базовый URL API
VITE_API_URL=http://localhost:3000

# Базовый путь приложения (если разворачиваете не в корне домена)
VITE_BASE_PATH=/

# Отображаемое название приложения
VITE_APP_NAME=Web App
```

В коде переменные доступны так:
```ts
const apiUrl = import.meta.env.VITE_API_URL;
```

### .env для production
На продакшене используйте `.env.production` (или `.env.production.local`). Эти файлы учитываются Vite при сборке:

```bash
# локально
cp .env.example .env.production
vi .env.production

# сборка
npm run build
```

### .env в Docker
Так как Vite внедряет переменные на этапе сборки, значения должны быть доступны внутри build‑стадии:

Вариант A — скопировать `.env.production` перед сборкой:
```Dockerfile
COPY .env.production ./.env.production
RUN npm run build:docker
```

Вариант B — передать значения через build args и сгенерировать `.env.production` внутри контейнера:
```Dockerfile
ARG VITE_API_URL
ARG VITE_BASE_PATH=/
ARG VITE_APP_NAME="Web App"
RUN printf "VITE_API_URL=%s\nVITE_BASE_PATH=%s\nVITE_APP_NAME=%s\n" "${VITE_API_URL}" "${VITE_BASE_PATH}" "${VITE_APP_NAME}" > .env.production \
  && npm run build:docker
```

Сборка с аргументами:
```bash
docker build \
  --build-arg VITE_API_URL=https://api.example.com \
  --build-arg VITE_BASE_PATH=/ \
  --build-arg VITE_APP_NAME="Web App" \
  -t web-app-nginx .
```

## Конфигурация Nginx (SPA fallback)
В образ копируется `nginx.conf` с правилом `try_files $uri $uri/ /index.html`, чтобы прямые переходы по роутам SPA (например, `/patients/123`) открывались корректно.

## Типизация/проверки
По умолчанию скрипт `build` выполняет строгую проверку типов (`tsc -b`) и может падать на неиспользуемых импортов/параметрах. Для Docker‑сборки удобнее использовать отдельный скрипт без типчека:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "build:docker": "vite build",
    "typecheck": "tsc -b",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

В `Dockerfile` при этом вызывается:
```Dockerfile
RUN npm ci --include=dev
RUN npm run build:docker
```


## Структура проекта (основное)
```
src/
  components/
  pages/
  routes/
  models/
  hooks/
```

