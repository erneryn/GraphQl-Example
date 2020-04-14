FROM node:12.0-alpine

WORKDIR /usr/local/application

ENV PORT=3002

RUN apk add --no-cache tini

COPY package.json package-lock.json* yarn.lock* ./

RUN npm install -g nodemon

RUN chown -R node:node .

USER node

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 3002

ENTRYPOINT [ "/sbin/tini", "--" ]

CMD ["node", "app.js"]