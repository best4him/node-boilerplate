'use strict'
const mysql = require('mysql2/promise')
const environment = {}

async function initMysql () {
  const mysqlDB = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT || 3306
  })

  environment.mysqlDB = mysqlDB
}

async function initEnvironment () {
  await Promise.all([
    initMysql()
  ])
}

environment.initEnvironment = initEnvironment

module.exports = environment
