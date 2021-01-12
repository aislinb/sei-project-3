import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 20 }, 
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  city: { type: String, required: false },
  userImage: { type: String, required: false },
  userBio: { type: String, required: false, maxlength: 400 },
  events: [{ type: mongoose.Schema.ObjectId, ref: 'Event', required: false }]
})

userSchema.virtual('createdEvents', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.virtual('createdVenues', {
  ref: 'Venue',
  localField: '_id',
  foreignField: 'owner'
})


userSchema.set('toJSON', {
  virtuals: true, 
  transform(_doc,json) {
    delete json.password
    delete json._v
    return json
    // this section removes password and version from the json responses
  }
})

userSchema
  .virtual('passwordConfirmation')
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function(next) {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      // if the password they have created or edited does not equal the password confirmation field. Cause an error.
      this.invalidate('passwordConfirmation', 'does not match')
    }
    next()
  })

userSchema
  .pre('save', function(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(uniqueValidator)

export default mongoose.model('User', userSchema)