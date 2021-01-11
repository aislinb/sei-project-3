import Venue from '../models/venue.js'
import { notFound, forbidden } from '../lib/errorHandler.js'

async function venueIndex(_req, res, next) {
  try {
    const venues = await Venue.find().populate('owner').populate('comments.owner')
    //.populate('venue')
    return res.status(200).json(venues)
  } catch (err) {
    next(err)
  }
}

async function venueCreate(req, res, next) {
  try {
    const newVenueData = { ...req.body, owner: req.currentUser._id }
    const newVenue = await Venue.create(newVenueData)
    return res.status(201).json(newVenue)
  } catch (err) {
    next(err)
  }
}

async function venueShow(req, res, next) {
  const { id } = req.params
  try {
    const venue = await Venue.findById(id).populate('event').populate('owner')
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
    if (!venueToEdit.owner.equals(req.currentUser._id)) throw new Error(forbidden)
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
    if (!venueToDelete.owner.equals(req.currentUser._id)) throw new Error(forbidden)
    await venueToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function venueCommentCreate(req, res, next) {
  const { id } = req.params
  try {
    const venue = await Venue.findById(id)
    if (!venue) throw new Error(notFound)
    const newComment = { ...req.body, owner: req.currentUser._id }
    venue.comments.push(newComment)
    await venue.save()
    return res.status(201).json(venue)
  } catch (err) {
    next(err)
  }
}

async function venueCommentDelete(req, res, next) {
  const { id, commentId } = req.params
  try {
    const venue = await Venue.findById(id) //look up venue
    if (!venue) throw new Error(notFound) // check existed
    const commentToDelete = venue.comments.id(commentId) // look up comment
    if (!commentToDelete) throw new Error(notFound) // look up exist
    if (!commentToDelete.owner.equals(req.currentUser._id)) throw new Error(forbidden) // checking if person making request is the owner of the comment
    await commentToDelete.remove()
    await venue.save()
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
  delete: venueDelete,
  commentCreate: venueCommentCreate,
  commentDelete: venueCommentDelete
}