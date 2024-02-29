import { Hono } from "hono";

export interface RouteHandler {
  getRoutes(): Hono;
}
