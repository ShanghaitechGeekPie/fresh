FROM daocloud.io/nginx

MAINTAINER eastpiger @ Geek Pie Association

EXPOSE 80

RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
RUN apt-get install -y nodejs

COPY nginx.conf /etc/nginx/nginx.conf
COPY fresh.conf /etc/nginx/sites-enabled/fresh.conf

RUN mkdir /logs
RUN mkdir /fresh
COPY dist /fresh/

RUN cd /fresh && npm install && npm run build && mv dist/assets/index.html dist/
