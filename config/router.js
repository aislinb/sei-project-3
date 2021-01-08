import express from 'express'
import events from '../controllers/events.js'

const router = express.Router()

router.route('/events')
  .get(events.index)
  .post(events.create)

router.route('/events/:id')
  .get(events.show)

export default router