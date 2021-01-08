import express from 'express'
import events from '../controllers/events.js'

const router = express.Router()

router.route('/events')
  .get(events.index)
  .post(events.create)

export default router