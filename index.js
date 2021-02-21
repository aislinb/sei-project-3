import express from 'express'
import { port } from './config/environment.js'
import connectToDatabase from './lib/connectToDb.js'
import logger from './lib/logger.js'
import router from './config/router.js'
import errorHandler from './lib/errorHandler.js'
import path from 'path' // * <—- a new import from node

const app = express()

const __dirname = path.resolve()

async function startServer() {
  try {
    await connectToDatabase()

    console.log('🤖 Database has connected')

    app.use(express.static(`${__dirname}/client/build`)) 

    app.use(express.json())

    app.use(logger)

    app.use('/api', router)

    app.use('/*', (_, res) => res.sendFile(`${__dirname}/client/build/index.html`))
    
    app.use(errorHandler)
    
    app.listen(port, () => console.log(`🤖 Up and running on port ${port}`))
  } catch (err) {

    console.log('🤖 Something went wrong startng the App')

    console.log(err)

  }
}

startServer()