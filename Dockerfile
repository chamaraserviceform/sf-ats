FROM node:18-alpine3.17

WORKDIR /app

#COPY package*.json ./
#
#RUN npm cache clean --force
#RUN npm install
#
#COPY . .
#
#RUN npm run build
#
#RUN npm install -g http-server

COPY. .

CMD ["sh", "-c", "http-server dist -p 8888"]
