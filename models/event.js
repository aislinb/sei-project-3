import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  date: { type: Date, required: true }, 
  venue: { type: mongoose.Schema.ObjectId, ref: 'Venue', required: true },
  venueRef: { type: String },
  description: { type: String, required: true, maxlength: 400 }, 
  eventImage: { type: String, required: true }
})

eventSchema.plugin(uniqueValidator)

export default mongoose.model('Event', eventSchema)