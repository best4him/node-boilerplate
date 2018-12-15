// eslint-disable-next-line no-unused-vars
const express = require('express')

/**
 *
 * @param {express.Request} req
 * @param {expresss.Response} res
 */
function sendResult (req, res) {
  let response = {
    status: 'success',
    data: res.data
  }

  res.status(res.statusCode).json(response)
}

module.exports = {
  sendResult
}
