FROM node:18-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install

COPY . .

RUN npm run build

RUN npm install -g http-server

CMD ["sh", "-c", "http-server dist -p ${PORT:-8080} -a 0.0.0.0"]
