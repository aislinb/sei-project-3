import User from '../models/user.js'
import { notFound } from '../lib/errorHandler.js'

async function userProfile(req, res, next){
  try {
    const user = await User.findById(req.currentUser._id)
      .populate('event')
      .populate('events.owner')
    if (!user) throw new Error(notFound)
    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

async function userProfileShow(req, res, next) {
  try {
    const user = await User.findById(req.currentUser._id)
      .populate('event') // this is not hooked up yet
    if (!user) throw new Error(notFound)
    return res.status(200).json(user)
    
  } catch (err) {
    next(err)
  }
}

async function userProfileUpdate(req, res, next) {
  const { id } = req.params
  try {
    console.log(id)
    const userToEdit = await User.findById((req.currentUser._id))
    if (!userToEdit) throw new Error(notFound)
    // if (!userToEdit.id.equals(req.currentUser._id)) throw new Error(forbidden)
    Object.assign(userToEdit, req.body)
    await userToEdit.save()
    return res.status(202).json(userToEdit)
  } catch (err) {
    next(err)
  }
}



export default {
  userProfile,
  userProfileShow,
  userProfileUpdate
}