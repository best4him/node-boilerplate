'use strict'

class ApplicationError extends Error {
  /**
   *
   * @param {String} message
   * @param {String} name
   * @param {Object} data
   * @param {number} statusCode
   */
  constructor (message, name, data, statusCode = 500) {
    super(message)

    this.name = name
    this.data = data
    this.statusCode = statusCode
  }
}

class InternalServerError extends ApplicationError {
  constructor (data = {}) {
    const message = 'An internal server has occurred'
    const name = 'internal_server_error'

    super(message, name, data, 500)
  }
}

class DatabaseError extends ApplicationError {
  constructor (data = {}) {
    const message = 'An internal server has occurred'
    const name = 'database_error'

    super(message, name, data, 500)
  }
}

class BadRequest extends ApplicationError {
  constructor (data = {}) {
    const message = 'Invalid request'
    const name = 'bad_request'

    super(message, name, data, 400)
  }
}

class InvalidPayloadError extends ApplicationError {
  constructor (data = {}) {
    const message = 'Invalid parameters'
    const name = 'invalid_payload'

    super(message, name, data, 400)
  }
}

class InvalidHttpMethodError extends ApplicationError {
  constructor (data = {}) {
    const message = 'Method not allowed'
    const name = 'invalid_http_method'

    super(message, name, data, 405)
  }
}

class PathNotImplementedError extends ApplicationError {
  constructor (data = {}) {
    const message = 'Not implemeneted'
    const name = 'not_implemented'

    super(message, name, data, 501)
  }
}

module.exports = {
  ApplicationError,
  InternalServerError,
  DatabaseError,
  BadRequest,
  InvalidPayloadError,
  InvalidHttpMethodError,
  PathNotImplementedError
}
