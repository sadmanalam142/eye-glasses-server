import mongoose from 'mongoose'
import app from '../src/app'
import config from './config/index'
import { Server } from 'http'

process.on('uncaughtException', error => {
  console.log('Uncaught exception is detected.....')
  console.log(error)
  process.exit(1)
})

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Database Connected Successfull')

    app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('Failed to connect database', error)
  }

  process.on('unhandledRejection', error => {
    console.log(
      'Unhandled rejection is detected, we are closing our server.....',
      error,
    )
    if (server) {
      server.close(() => {
        console.log(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()

process.on('SIGTERM', () => {
  console.log('SIGTERN is recieved')
  if (server) {
    server.close()
  }
})

module.exports = app
