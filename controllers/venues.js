import Venue from '../models/venue.js'
import { notFound } from '../lib/errorHandler.js'

async function venueIndex(_req, res, next) {
  try {
    const venues = await Venue.find()
    //.populate('venue')
    return res.status(200).json(venues)
  } catch (err) {
    next(err)
  }
}

async function venueCreate(req, res, next) {
  try {
    const newVenue = await Venue.create(req.body)
    return res.status(201).json(newVenue)
  } catch (err) {
    next(err)
  }
}

async function venueShow(req, res, next) {
  const { id } = req.params
  try {
    const venue = await Venue.findById(id)
    if (!venue) throw new Error(notFound)
    return res.status(200).json(venue)
  } catch (err) {
    next(err)
  }
}

async function venueUpdate(req, res, next) {
  const { id } = req.params
  try {
    const venueToEdit = await Venue.findById(id)
    if (!venueToEdit) throw new Error(notFound)
    Object.assign(venueToEdit, req.body)
    await venueToEdit.save()
    return res.status(202).json(venueToEdit)
  } catch (err) {
    next(err)
  }
}

async function venueDelete(req, res, next) {
  const { id } = req.params
  try {
    const venueToDelete = await Venue.findById(id)
    if (!venueToDelete) throw new Error(notFound)
    await venueToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function eventCommentCreate(req, res, next) {
  const { id } = req.params
  try {
    const event = await Event.findById(id)
    if (!event) throw new Error(notFound)
    const newComment = { ...req.body, owner: req.currentUser._id }
    event.comments.push(newComment)
    await event.save()
    return res.status(201).json(event)
  } catch (err) {
    next(err)
  }
}

async function eventCommentDelete(req, res, next) {
  const { id, commentId } = req.params
  try {
    const event = await event.findById(id) //look up event
    if (!event) throw new Error(notFound) // check existed
    const commentToDelete = Event.comments.id(commentId) // look up comment
    if (!commentToDelete) throw new Error(notFound) // look up exist
    if (!commentToDelete.owner.equals(req.currentUser._id)) throw new Error(forbidden) // checking if person making request is the owner of the comment
    await commentToDelete.remove()
    await event.save()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

export default {
  index: venueIndex,
  create: venueCreate,
  show: venueShow, 
  update: venueUpdate, 
  delete: venueDelete
}