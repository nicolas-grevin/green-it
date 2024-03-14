FROM node:21-alpine AS build

WORKDIR /build

COPY . .

RUN yarn build

FROM node:21-alpine

COPY --from=build /build/app.mjs /app/app.mjs

CMD ["node", "/app/app.mjs"]
