'use strict'
const { ApplicationError } = require('../resources/errors')
// eslint-disable-next-line no-unused-vars
const express = require('express')

function catchUnknownErrors (err, req, res, next) {
  if (err instanceof ApplicationError) {
    return next(err)
  }

  next(new ApplicationError('Somenthing unexpacted occured!', 'unknown_error', null, 500))
}
/**
 *
 * @param {ApplicationError | Error} err
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {Function} next
 */
function errorHandler (err, req, res, next) {
  res.status(err.statusCode)
  let clientError = {
    'message': err.message,
    'status': 'error'
  }
  res.json(clientError)
}

module.exports = {
  catchUnknownErrors,
  errorHandler
}
