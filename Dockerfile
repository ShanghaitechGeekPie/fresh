FROM node:8-alpine AS build

RUN mkdir /logs
RUN mkdir /fresh
COPY . /fresh

RUN rm -Rf /fresh/dist

RUN cd /fresh \
  && npm install

RUN cd /fresh \
  && npm run build \
  && mv dist/assets/index.html dist/ \
  && rm -rf node_modules

FROM nginx:latest

MAINTAINER Geek Pie Association @ ShanghaiTech

EXPOSE 80

COPY nginx.conf /etc/nginx/nginx.conf
COPY fresh.conf /etc/nginx/sites-enabled/fresh.conf
RUN mkdir /logs

COPY --from=build /fresh/dist /fresh/dist
