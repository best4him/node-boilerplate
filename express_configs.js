'use strict'

const bodyParser = require('body-parser')
const compression = require('compression')
const morgan = require('morgan')

module.exports = function (app) {
  app.use(morgan('dev'))
  app.use(compression())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  let env = process.env.NODE_ENV

  if (env === 'development' || env === 'test') {
    app.use(require('cors')())
  }
}
