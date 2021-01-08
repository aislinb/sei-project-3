import Event from '../models/event.js'
import { notFound } from './../lib/errorHandler.js'

async function eventIndex(_req, res, next) {
  try {
    const events = await Event.find().populate('venue')
    //.populate('venue')
    return res.status(200).json(events)
  } catch (err) {
    next(err)
  }
}

async function eventCreate(req, res, next) {
  try {
    const newEvent = await Event.create(req.body)
    return res.status(201).json(newEvent)
  } catch (err) {
    next(err)
  }
}

async function eventShow(req, res, next) {
  const { id } = req.params
  try {
    const event = await Event.findById(id)
    if (!event) throw new Error(notFound)
    return res.status(200).json(event)
  } catch (err) {
    next(err)
  }
}




export default {
  index: eventIndex,
  create: eventCreate,
  show: eventShow
}