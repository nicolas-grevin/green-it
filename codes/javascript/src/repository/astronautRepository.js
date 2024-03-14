import Astronaut from '../model/astronaut.js'

import postgresClient from '../client/postgresClient.js'

const hydrate = (data) => {
  if (Array.isArray(data)) {
    return data.map(r => hydrate(r))
  }

  return new Astronaut(data.id, data.name)
}

const findAll = async () => {
  const data = await postgresClient.query('SELECT id, name FROM astronauts OFFSET 0 LIMIT 100')

  return hydrate(data.rows)
}

const findById = async (id) => {
  const data = await postgresClient.query('SELECT id, name FROM astronauts WHERE id = $1', [id])

  return hydrate(data.rows[0])
}

export { findAll, findById }
