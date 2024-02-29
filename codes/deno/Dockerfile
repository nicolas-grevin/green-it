FROM denoland/deno:alpine-1.41.0 AS base

WORKDIR /app

USER deno

EXPOSE 8000

FROM base AS dev

CMD ["deno", "task", "dev"]

FROM base AS build

WORKDIR /build

COPY . . 

RUN deno task compile

FROM base AS prod

WORKDIR /

COPY --from=build /build .

CMD ["./app", "--allow-env", "--allow-net"]
