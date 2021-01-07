import mongoose from 'mongoose'
import connectToDatabase from '../lib/connectToDb.js'
import Event from '../models/event.js'
import eventData from './data/events.js'

async function seedDatabase() {
  try {
    await connectToDatabase()

    console.log('🤖 Database connected')

    await mongoose.connection.db.dropDatabase()

    console.log('🤖 Database dropped')

    const events = await Event.create(eventData)

    console.log(`🤖 ${events.length} events created`)

    await mongoose.connection.close()
    console.log('🤖 Goodbye')

  } catch (err) {
    console.log('🤖 Something went wrong')
    console.log(err)

    await mongoose.connection.close()
    console.log('🤖 Goodbye')
  }
}

seedDatabase()