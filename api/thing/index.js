'use strict'

const express = require('express')
const controller = require('./thing.controller')
const validatorUtility = require('../../middleware/validator')
const schema = require('./schema.json')

const router = express.Router()
router.use(validatorUtility.getValidator(schema))

router.get('/', controller.index)
// router.get('/:id', controller.show)
// router.post('/', controller.create)
// router.put('/:id', controller.upsert)
// router.patch('/:id', controller.patch)
// router.delete('/:id', controller.destroy)

module.exports = router
