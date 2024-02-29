import { Client } from "postgres";

export class PostgresService {
  private _client: Client;

  constructor() {
    this._client = new Client({
      hostname: Deno.env.get("POSTGRES_HOST") || "localhost",
      port: Deno.env.get("POSTGRES_PORT") || 5432,
      database: Deno.env.get("POSTGRES_DB") || "database",
      user: Deno.env.get("POSTGRES_USER") || "user",
      password: Deno.env.get("POSTGRES_PASSWORD") || "password",
    });
  }

  getClient(): Client {
    return this._client;
  }
}
