'use strict'

// eslint-disable-next-line no-unused-vars
const express = require('express')

const { mysqlDB } = require('../../resources/environment')
const { DatabaseError } = require('../../resources/errors')

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {Function} callback
 */
async function index (req, res, callback) {
  try {
    const [things] = await mysqlDB.execute(`SELECT * FROM test`)
  
    res.statusCode = 201
    res.data = things

    callback()
  } catch (err) {
    callback(new DatabaseError(err))
  }
}

module.exports = {
  index
}
