FROM node:14-alpine

ENV NODE_ENV=development \
    TZ=America/Sao_Paulo \
    APP_HOME=/usr/src/app \
    PATH=$PATH:/home/node/.npm-global/bin:/home/node/node_modules/.bin:$PATH

RUN apk add --no-cache g++ make python3 bash tini tzdata && \
    ln -sf /usr/share/zoneinfo/${TZ} /etc/localtime \
    echo $TZ > /etc/timezone \
    apk del tzdata

RUN npm install -g @nestjs/cli@7.6.0

RUN mkdir -p ${APP_HOME}/node_modules

RUN chown -R node:node ${APP_HOME}

USER node

WORKDIR ${APP_HOME}

COPY --chown=node:node package*.json ./

RUN npm cache clean --force

COPY --chown=node:node . ./

EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["npm", "run", "start:dev"]