FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3001

RUN npm run build

CMD ["npx", "serve", "-s", "build", "-l", "3000"]
