FROM daocloud.io/nginx

MAINTAINER eastpiger @ Geek Pie Association

EXPOSE 80

RUN mkdir /logs
RUN mkdir /fresh
COPY dist /fresh/
COPY nginx.conf /etc/nginx/nginx.conf
COPY fresh.conf /etc/nginx/sites-enabled/fresh.conf
