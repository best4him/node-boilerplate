'use strict'

const AJV = require('ajv')
const _ = require('lodash')
const uuid = require('uuid')
const pathToRegex = require('path-to-regexp')

const { InvalidHttpMethodError, InvalidPayloadError, PathNotImplementedError } = require('../resources/errors')

const ajv = new AJV()

function parseQuery (query) {
  _.mapValues(query, (value) => {
    return _.isNumber(value) ? parseFloat(value) : value
  })
}

function getValidator (schema) {
  return function (req, res, next) {
    const [url] = req.originalUrl.split('?')
    const { method } = req
    let reqBody = {}

    if (!_.isEmpty(req.body)) {
      reqBody = req.body
    }

    if (!_.isEmpty(req.query)) {
      reqBody = {
        ...reqBody,
        ...parseQuery(req.query)
      }
    }

    req.requestId = uuid.v4()

    if (!schema[method]) {
      return next(new InvalidHttpMethodError(getRequestDetails()))
    }

    for (const path in schema[method]) {
      const pathRegex = pathToRegex(path)

      if (pathRegex.test(url)) {
        if (ajv.validate(schema[method][path], reqBody)) {
          return next()
        }

        return next(new InvalidPayloadError(getRequestDetails()))
      }
    }

    next(new PathNotImplementedError(getRequestDetails()))

    function getRequestDetails () {
      return {
        'url': req.originalUrl,
        'method': method,
        'body': req.body
      }
    }
  }
}

module.exports = {
  getValidator
}
