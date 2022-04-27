const express = require('express')
const multer = require('../middleware/multer-config')
const router = express.Router()
const auth = require('../middleware/auth')

const topicCtrl = require('../controllers/topic.controller')

// get all topics
router.get('/', auth, topicCtrl.findAll)

// get users topic
router.get('/user/:id', auth, topicCtrl.findByUser)

// get one topic
router.get('/:id', auth, topicCtrl.findOneById)

// create one topic
router.post('/', multer, auth, topicCtrl.createOne)

// add one post_id to topic
router.put('/:topicid', auth, topicCtrl.addPostId)

// delete one topic
router.delete('/:id', auth, topicCtrl.deleteOne)
// delete users topcs
router.delete('/user/:id', auth, topicCtrl.deleteByUserId)

module.exports = router