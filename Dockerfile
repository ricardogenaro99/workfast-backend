FROM node:16.15.1

WORKDIR /app

RUN npm install nodemon -g

COPY package*.json ./

RUN npm install

EXPOSE 3001
CMD ["nodemon", "-L","index.js"]
