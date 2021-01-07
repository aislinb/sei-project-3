import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, 
  city: { type: String, required: true }, 
  country: { type: String, required: true }, 
  continent: { type: String, required: true },
  venueImage: { type: String, required: true }
})

venueSchema.plugin(uniqueValidator)

export default mongoose.model('Venue', venueSchema)