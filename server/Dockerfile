FROM node


WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 4444

CMD ["npm","run","start:dev"]