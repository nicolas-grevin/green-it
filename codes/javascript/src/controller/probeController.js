import express from 'express'

import { testConnection } from '../repository/probeRepository.js'

import Probe from '../model/probe.js'
import ProbeServiceStatus from '../model/probeServiceStatus.js'

const router = express.Router()

const check = (_, res) => {
  const probe = new Probe()
  const postgresProbeServiceStatus = new ProbeServiceStatus('ok', 'Service is up')
  res.status(200)

  try {
    testConnection()
  } catch (err) {
    console.error(err)

    res.status(500)

    postgresProbeServiceStatus.status = 'nok'
    postgresProbeServiceStatus.message = 'Service is down'
  }

  probe.services.set('postgres', postgresProbeServiceStatus)

  res.json(Object.fromEntries(probe.services))
}

router.get('/liveness', check)

router.get('/:id', check)

export default router
