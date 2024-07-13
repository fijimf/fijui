# Stage 1: Build the Angular application
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN mkdir -p dist/out
RUN npm run build -- --output-path=./dist/out --configuration production

# Stage 2: Serve the application from Nginx
FROM nginx:alpine
COPY --from=build /usr/src/app/dist/out/browser /usr/share/nginx/html
RUN ls -ltr /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf