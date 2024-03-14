import express from 'express'

import astronautController from './controller/astronautController.js'
import probeContoller from './controller/probeController.js'

const app = express()

app.listen(8080, () => {
  console.info('Server is listening on port 8080')
})

app.use(express.json())

app.use('/api/v1/astronauts', astronautController)
app.use('/api/v1', probeContoller)

app.all('*', (_, res) => {
  res.status(404).json({ error: 'page not found' })
})
