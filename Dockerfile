FROM debian:10

RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash \
    && apt-get install nodejs -yq \
    && apt-get install -yq nginx \
    && apt-get install nano \
    && apt-get clean -y

ADD . /app/
WORKDIR /app
RUN npm install --production && npm run build:prod \
    && cp -r /app/assets /app/dist/ \
    && cp -rf /app/dist /var/www \
    && rm /etc/nginx/nginx.conf \
    && cp /app/nginx.conf  /etc/nginx/

EXPOSE 3000
VOLUME /app/dist

CMD service nginx start && npm run start

# sudo docker exec -ti [docker id] bash
# service nginx start
