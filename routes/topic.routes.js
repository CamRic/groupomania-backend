const express = require('express')
const router = express.Router()

const topicCtrl = require('../controllers/topic.controller')

// get all topics
router.get('/', topicCtrl.findAll)

// create one topic
router.post('/', topicCtrl.createOne)

module.exports = router