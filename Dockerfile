FROM node:alpine3.14
ARG PORT

USER root
WORKDIR /app

COPY package.json .
COPY tsconfig.json .

RUN npm install --loction=global typescript &&\
    npm install --loction=global ts-node &&\
    npm install &&\
    npm i -g ts-node-dev &&\
    mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache


USER node

ADD . .
ENV HOST=0.0.0.0
ENV PORT=${PORT}
EXPOSE ${PORT}
ENTRYPOINT [ "npm" ]
CMD [ "run", "start:dev"]