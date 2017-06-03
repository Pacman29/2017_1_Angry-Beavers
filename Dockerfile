#FROM nginx:1.13-alpine
#RUN apk add --update bash

#RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.backup
#COPY ./joking-hazard.conf        /etc/nginx/conf.d/
#COPY ./joking-hazard_listen.conf /etc/nginx/


#RUN mkdir /joking-hazard
#COPY ./port.sh /joking-hazard/
#RUN chmod +x /joking-hazard/port.sh
#COPY ./public/static /joking-hazard/public/static

#CMD /joking-hazard/port.sh /etc/nginx/joking-hazard_listen.conf && nginx -g 'daemon off;'
#####################
FROM ubuntu:16.04

RUN apt-get -y update
RUN apt-get install -y wget curl
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs

RUN apt-get install -y software-properties-common \
    && apt-add-repository -y ppa:nginx/stable \
    && apt-get update \
    && apt-get install -y nginx \
    && rm -rf /var/lib/apt/lists/*

ADD . /Frontend
WORKDIR /Frontend
RUN npm install \
    && cp ./public/static/bundle.js /usr/share/nginx/html \
    && cp ./public/static/index.html /usr/share/nginx/html \
    && cp ./public/static/sw.js /usr/share/nginx/html \
    && cp ./public/static/images  /usr/share/nginx/html/images -R \
    && cp ./public/static/fonts /usr/share/nginx/html/fonts -R

WORKDIR /
RUN rm -r /Frontend && apt-get purge -y nodejs

ADD ./joking-hazard.conf        /etc/nginx/nginx.conf
COPY ./joking-hazard_listen.conf /etc/nginx/

# RUN rm /etc/nginx/sites-enabled/default

RUN cat /etc/nginx/nginx.conf
RUN ls -la /usr/share/nginx/html

COPY ./port.sh /usr/share/nginx/html
RUN chmod +x /usr/share/nginx/html/port.sh

RUN ls -la /etc/nginx

CMD /usr/share/nginx/html/port.sh /etc/nginx/joking-hazard_listen.conf && nginx -g 'daemon off;'


