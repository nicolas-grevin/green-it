import { Hono, Context } from "hono";
import { Client } from "postgres";

import { RouteHandler } from "./route.ts";

import { Probe, ServiceStatus, Services } from "../model/probe.ts";

export class ProbeHandler implements RouteHandler {
  private _client: Client;
  private _router: Hono;

  constructor(client: Client) {
    this._client = client;
    this._router = new Hono();
  }

  getRoutes(): Hono {
    this._router.get("/liveness", (c: Context) => this.liveness(c));
    this._router.get("/readiness", (c: Context) => this.readiness(c));

    return this._router;
  }

  private liveness(c: Context) {
    return this.check(c);
  }
  
  private readiness(c: Context) {
    return this.check(c);
  }

  private async check(c: Context) {
    const postgresServiceStatus: ServiceStatus = {
      status: "ok",
      message: "Service is up"
    };

    const services: Services = {
      "postgres": postgresServiceStatus, 
    };

    const probe: Probe = {
      services
    }

    try {    
      await this._client.queryArray`SELECT 1`;
    } catch (e) {
      postgresServiceStatus.status = "nok";
      postgresServiceStatus.message = "Service is down";
    
      return c.json(probe, 500)
    }

    return c.json(probe, 200);
  }
}
