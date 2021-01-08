import express from 'express'
import events from '../controllers/events.js'
import venues from '../controllers/venues.js'

const router = express.Router()

router.route('/events')
  .get(events.index)
  .post(events.create)

router.route('/events/:id')
  .get(events.show)
  .put(events.update)
  .delete(events.delete)

router.route('/venues')
  .get(venues.index)
  .post(venues.create)

router.route('/venues/:id')
  .get(venues.show)
  .put(venues.update)
  .delete(venues.delete)

export default router