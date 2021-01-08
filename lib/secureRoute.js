import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'
import User from '../models/user.js'

export default async function secureRoute(req, res, next) {
  try {
    if (!req.headers.authorization) {
      throw new Error('Missing Required Header') 
    } //no authorization key 

    const token = req.headers.authorization.replace('Bearer ', '') // attempt made to get token 
    const payload = jwt.verify(token, secret) // verifying token. id will be here on key of sub
    const userToVerify = await User.findById(payload.sub) // finding the user attributed to token 

    if (!userToVerify) {
      throw new Error('User not Found')
    }

    req.currentUser = userToVerify // currentUser is made up but this is the user found on the token. 

    next()

  } catch (err) {
    console.log('🤖 Authorization Error', err.name, err.message)
    return res.status(401).json({ message: 'Unauthorized' })
  }
}