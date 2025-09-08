# Стадия сборки
FROM node:20-alpine AS build
WORKDIR /app

# Кэшируем зависимости
COPY package.json package-lock.json ./
RUN npm ci

# Копируем остальной код и собираем
COPY . .
RUN npm run build

# Стадия рантайма с nginx
FROM nginx:1.25-alpine

# Пользователь (без root) и папка статики
# В alpine это уже настроено, просто выставим права на html
COPY --from=build /app/dist /usr/share/nginx/html

# Кладём конфиг nginx с SPA fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]