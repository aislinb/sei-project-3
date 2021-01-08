import Venue from '../models/venue.js'



async function venueIndex(_req, res, next) {
  try {
    const venues = await Venue.find()
    //.populate('venue')
    return res.status(200).json(venues)
  } catch (err) {
    next(err)
  }
}

export default {
  index: venueIndex
}