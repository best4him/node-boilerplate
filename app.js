'use strict'

require('dotenv').config()
const express = require('express')
const http = require('http')

const configExpress = require('./express_configs')
const configRoutes = require('./routes')

const app = express()
const server = http.createServer(app)

configExpress(app)
configRoutes(app)

server.listen(process.env.PORT, () => {
  console.log('Express server listening on %d, in %s mode', process.env.PORT, process.env.NODE_ENV)
})
