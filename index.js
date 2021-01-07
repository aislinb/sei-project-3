import express from 'express'
// import mongoose from 'mongoose'
import { port } from './config/environment.js'
import connectToDatabase from './lib/connectToDb.js'
import logger from './lib/logger.js'

const app = express()

async function startServer() {
  try {
    await connectToDatabase()

    console.log('🤖 Database has connected')

    app.use(express.json())

    app.use(logger)

    app.listen(port, () => console.log(`🤖 Up and running on port ${port}`))
  } catch (err) {

    console.log('🤖 Something went wrong startng the App')

    console.log(err)

  }
}

startServer()