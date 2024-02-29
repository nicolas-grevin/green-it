import { Hono } from "hono";
import { cors, prettyJSON } from "hono/middleware";

import { AstronautHandler } from "./route/astronaut.ts";
import { ProbeHandler } from "./route/probe.ts";
import { PostgresService } from "./service/postgres.ts";

const postgresClient = (new PostgresService).getClient();

const apiV1 = new Hono().basePath("/api/v1");

apiV1.use("*", prettyJSON());
apiV1.use("*", cors());

apiV1.route("", (new ProbeHandler(postgresClient)).getRoutes());
apiV1.route("/astronauts", (new AstronautHandler(postgresClient)).getRoutes());

apiV1.notFound(c => c.json({ message: "Not Found" }, 404));

Deno.serve(apiV1.fetch)
