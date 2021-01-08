import User from '../models/user.js'
import { notFound } from '../lib/errorHandler.js'

async function userProfile(req, res, next){
  try {
    const user = await User.findById(req.currentUser._id)
    if (!user) throw new Error(notFound)
    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

export default {
  userProfile
}