FROM openjdk:21-slim AS base

WORKDIR /app

FROM base AS dev

EXPOSE 8080

CMD ["./mvnw", "spring-boot:run", "--debug"]

FROM base AS build

WORKDIR /build

COPY . . 

RUN ./mvnw clean package

FROM base AS prod

COPY --from=build /build/target/green_it-0.0.1-SNAPSHOT.jar /app.jar

EXPOSE 8080

CMD ["java", "-jar", "/app.jar"]
