'use strict'

const bodyParser = require('body-parser')
const compression = require('compression')
const errorHandler = require('errorhandler')

module.exports = function (app) {
  app.use(compression())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  let env = process.env.NODE_ENV

  if (env === 'development' || env === 'test') {
    app.use(require('cors')())
    app.use(errorHandler()) // Error handler - has to be last
  }
}
