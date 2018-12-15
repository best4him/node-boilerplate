'use strict'

require('dotenv').config()
const express = require('express')
const http = require('http')
const util = require('util')

const configExpress = require('./express_configs')
const configRoutes = require('./routes')
const { initEnvironment } = require('./resources/environment')
const { catchUnknownErrors, errorHandler } = require('./middleware/errorMiddleware')
const { sendResult } = require('./middleware/sendResult')
const app = express()
const server = http.createServer(app)

async function initApp () {
  try {
    await initEnvironment()
    configExpress(app)
    configRoutes(app)
    app.use(catchUnknownErrors)
    app.use(errorHandler)
    app.use(sendResult)
  } catch (err) {
    console.log('Error occured on init:', util.inspect(err))

    process.exit(1)
  }

  server.listen(process.env.PORT, () => {
    console.log('Express server listening on %d, in %s mode', process.env.PORT, process.env.NODE_ENV || 'develoment')
  })
}

initApp()
