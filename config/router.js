import express from 'express'
import events from '../controllers/events.js'
import venues from '../controllers/venues.js'
import auth from '../controllers/auth.js'
import users from '../controllers/users.js'
import secureRoute from '../lib/secureRoute.js'

const router = express.Router()

router.route('/events')
  .get(events.index)
  .post(secureRoute, events.create)

router.route('/events/:id')
  .get(events.show)
  .put(secureRoute, events.update)
  .delete(secureRoute, events.delete)

router.route('/venues')
  .get(venues.index)
  .post(secureRoute, venues.create)

router.route('/venues/:id')
  .get(venues.show)
  .put(secureRoute, venues.update)
  .delete(secureRoute, venues.delete)

router.route('/events/:id/comments')
  .post(secureRoute, events.commentCreate)

router.route('/events/:id/comments/:commentId')
  .delete(secureRoute, events.commentDelete)

router.route('/venues/:id/comments')
  .post(secureRoute, venues.commentCreate)

router.route('/venues/:id/comments/:commentId')
  .delete(secureRoute, venues.commentDelete)

router.route('/profile')
  .get(secureRoute, users.userProfile)

router.route('/register')
  .post(auth.registerUser)

router.route('/login')
  .post(auth.loginUser)

export default router