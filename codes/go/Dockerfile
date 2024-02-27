FROM golang:1.22-alpine AS build

ENV GIN_MODE=release

WORKDIR /App

COPY . .

RUN go mod download \
    && CGO_ENABLED=0 GOOS=linux go build -o /api cmd/api.go

FROM scratch

COPY --from=build /api /api

EXPOSE 8080

CMD ["/api"]
