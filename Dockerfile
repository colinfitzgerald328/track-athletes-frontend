# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /src/app
COPY . .
RUN yarn install --production
CMD ["node", "layout.js"]
EXPOSE 3000