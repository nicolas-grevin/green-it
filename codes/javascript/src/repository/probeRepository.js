import postgresClient from '../client/postgresClient.js'

const testConnection = () => postgresClient.query('SELECT 1')

export { testConnection }
