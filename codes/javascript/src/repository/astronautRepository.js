import Astronaut from '../model/astronaut.js'

import postgresClient from '../client/postgresClient.js'

const hydrate = data => {
  if (Array.isArray(data)) {
    for (const row of data) {
      hydrate(row)
    }
  }

  return new Astronaut(data.id, data.name)
}

const findAll = async () => hydrate(await postgresClient.query('SELECT id, name FROM astronauts OFFSET 0 LIMIT 100').rows)

const findById = async id => hydrate(await postgresClient.query('SELECT id, name FROM astronauts WHERE id = $1', [id]).rows[0])

export { findAll, findById }
