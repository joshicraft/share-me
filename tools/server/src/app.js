import config from '../../config/index'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'

import index from './routes'

// import seeder from './routes/seeder/seeder'

/*
Mongo API KEY
API Key:02698a63-6c54-45cd-bea7-336ca4064388
Description:Test Mongo Atlas API KEY
 */

export default (cfg) => {
  let app,
    server
  cfg = cfg || {}
  const disconnect = () => {
    console.log('\nServer Shut Down')
    return server.close()
  }
  const events = () => {
    // CONNECTION EVENTS

    process.on('SIGTERM', (e) => {
      console.log('SIGTERM' + e)
      disconnect()
    })

    /*
      Most server errors occur here
     */
    process.on('uncaughtException', (e) => {
      // console.log("uncaughtException" + e)
      // disconnect()
    })

    // When successfully connected to db
    mongoose.connection.on('connected', () => {
      console.log('Mongoose default connection open')
    })

    // If the connection throws an error
    mongoose.connection.on('error', (err) => {
      console.log('Mongoose default connection error: ' + err)
    })

    // When the connection is disconnected
    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose default connection disconnected')
    })

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination')
        // process.exit(0);
      })
    })
  }

  function serve (done) {
    console.log('Server Listening on port: ' + config.server.port)
    // console.log(this.collection('result'))

    return app.listen(config.server.port)
    // return server = app.listen(config.server.port)

    /*
        Below is code to detect if port is running. Will likely need to address this at a later date.
        Some sort of server management for tests might be good here so that when running tests or development we
        wont need to manual spin up servers and use prexisiting ones. The same should be done for the client dev server.
       */
    // return detect(config.server.port)
    //   .then(_port => {
    //     if (config.server.port === _port) {
    //       return server = app.listen(config.server.port)
    //     } else {
    //       console.log(`port: ${config.server.port} was occupied, try port: ${_port}`);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  const connect = (done) => {
    events()

    return mongoose.connect(config.server.dbTestURL, {
      useNewUrlParser: true
    }).then(done => serve(done))
  }

  return {
    db: mongoose.connection,
    collection (collection) {
      return mongoose.connection.db.collection(collection)
    },
    close (done) {
      return disconnect(done)
    },
    start (done) {
      app = express()
      app.use(morgan('combined'))
      app.use(bodyParser.json())
      app.use(cors())
      app.use('/', index)
      // app.use('/seeder', seeder)
      connect(done)
    }
  }
}
