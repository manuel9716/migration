FROM node:12.22.1-alpine3.11

WORKDIR /app
COPY . .
RUN npm install
RUN apk add --no-cache bash

EXPOSE 8090

CMD ["npm", "start"]
