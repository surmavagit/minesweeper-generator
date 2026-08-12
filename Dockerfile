FROM node:26.7.0-alpine
WORKDIR /usr/local/app

COPY package*.json ./
RUN npm ci

COPY index.js ./

EXPOSE 8000

CMD ["node", "index.js"]
