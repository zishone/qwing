FROM node:alpine

EXPOSE 5000

WORKDIR /app

COPY ./ ./

RUN \
  npm install && \
  npm run build

CMD ["npm", "run", "prod"]