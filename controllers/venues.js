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

export default {
  index: venueIndex,
  create: venueCreate,
  show: venueShow, 
  update: venueUpdate, 
  delete: venueDelete
}