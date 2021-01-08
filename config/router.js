import express from 'express'
import events from '../controllers/events.js'
import venues from '../controllers/venues.js'

const router = express.Router()

router.route('/events')
  .get(events.index)
  .post(events.create)

router.route('/events/:id')
  .get(events.show)

router.route('/venues')
  .get(venues.index)

export default router