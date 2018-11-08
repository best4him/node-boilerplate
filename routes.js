'use strict'

module.exports = (app) => {
  app.use('/api/things', require('./api/thing'))
}
