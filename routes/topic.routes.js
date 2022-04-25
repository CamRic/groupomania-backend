const express = require('express')
const multer = require('../middleware/multer-config')
const router = express.Router()

const topicCtrl = require('../controllers/topic.controller')

// get all topics
router.get('/', topicCtrl.findAll)

// get users topic
router.get('/user/:id', topicCtrl.findByUser)

// get one topic
router.get('/:id', topicCtrl.findOneById)

// create one topic
router.post('/', multer, topicCtrl.createOne)

// add one post_id to topic
router.put('/:topicid', topicCtrl.addPostId)

// delete one topic
router.delete('/:id', topicCtrl.deleteOne)

module.exports = router