import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 300  }, 
  rating: { type: Number, required: true, min: 1, max: 5 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
})

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  date: { type: Date, required: true }, 
  venue: { type: mongoose.Schema.ObjectId, ref: 'Venue', required: true },
  description: { type: String, required: true, maxlength: 400 }, 
  eventImage: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }, // the user model is register as User so we must ref User here. Relationship now established.
  comments: [commentSchema],
})

eventSchema.virtual('avgRating').get(function() {
  if (!this.comments.length) return 'Not rated yet'
  const avg = this.comments.reduce((sum, curr) => {
    return sum + curr.rating
  }, 0)
  return Math.round(avg / this.comments.length)
})

eventSchema.set('toJSON', { virtuals: true })

eventSchema.plugin(uniqueValidator)

export default mongoose.model('Event', eventSchema)