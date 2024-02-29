import { Hono, Context } from "hono";
import { Client } from "postgres";

import { RouteHandler } from "./route.ts";

import { AstronautRepository } from "../repository/astronaut.ts";

export class AstronautHandler implements RouteHandler {
  private _repository: AstronautRepository;
  private _router: Hono

  constructor(client: Client) {
    this._repository = new AstronautRepository(client);
    this._router = new Hono();
  }

  getRoutes(): Hono {
    this._router.get("", (c: Context) => this.list(c))
    this._router.get("/:id", (c: Context) => this.view(c))

    return this._router
  }

  private async list(c: Context) {
    try {
      return c.json(await this._repository.list(), 200);
    } catch (e) {
      return c.json({"error": e}, 200);
    }
  }

  private async view(c: Context) {
    try {
      const { id } = c.req.param();

      return c.json(await this._repository.findById(id), 200);
    } catch (e) {
      return c.json({"error": e}, 200);
    }
  }
}
