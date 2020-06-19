FROM debian:10

RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash \
    && apt-get install nodejs -yq \
    && apt-get install -yq nginx \
    && apt-get clean -y

ADD . /app/
WORKDIR /app
RUN npm install --production && npm run build:prod

EXPOSE 80
VOLUME /app/dist

CMD npm run start
