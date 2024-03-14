import express from 'express'

import { findAll, findById } from '../repository/astronautRepository.js'

const router = express.Router()

router.get('', async (_, res) => {
  try {
    res.status(200).json(await findAll())
  } catch (err) {
    console.log(err)

    res.status(500).json({ error: err.messsage })
  }
})

router.get('/:id', async (req, res) => {
  try {
    res.status(200).json(await findById(req.params.id))
  } catch (err) {
    console.log(err)

    res.status(500).json({ error: err.messsage })
  }
})

export default router
