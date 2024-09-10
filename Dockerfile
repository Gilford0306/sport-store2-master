# Указываем базовый образ для node
FROM node:16-alpine AS build

# Задаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Собираем приложение для продакшн
RUN npm run build

# Используем nginx для сервировки приложения
FROM nginx:alpine

# Копируем собранное приложение в корневую директорию nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копируем конфигурационный файл Nginx
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Экспонируем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
