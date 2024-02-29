import { Client } from "postgres";

import { Astronaut } from "../model/astronaut.ts"

export class AstronautRepository {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async list(): Promise<Astronaut[]> {
    const array_result = await this._client.queryObject<Astronaut>`SELECT id, name FROM astronauts`

    return array_result.rows;
  }
  
  async findById(id: string): Promise<Astronaut> {
    const object_result = await this._client.queryObject<Astronaut>`SELECT id, name FROM astronauts WHERE id = ${id}`;

    return object_result.rows[0];
  }
}
