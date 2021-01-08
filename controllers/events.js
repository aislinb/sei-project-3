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

async function eventUpdate(req, res, next) {
  const { id } = req.params
  try {
    const eventToEdit = await Event.findById(id)
    if (!eventToEdit) throw new Error(notFound)
    Object.assign(eventToEdit, req.body)
    await eventToEdit.save()
    return res.status(202).json(eventToEdit)
  } catch (err) {
    next(err)
  }
}

async function eventDelete(req, res, next) {
  const { id } = req.params
  try {
    const eventToDelete = await Event.findById(id)
    if (!eventToDelete) throw new Error(notFound)
    await eventToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}



export default {
  index: eventIndex,
  create: eventCreate,
  show: eventShow, 
  update: eventUpdate, 
  delete: eventDelete
}