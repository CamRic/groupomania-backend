const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post.controller')
const auth = require('../middleware/auth')

// get all posts
router.get('/', postCtrl.findAll)
// get all topic posts
router.get('/topic/:id', postCtrl.findAllInTopic)

// get one post
router.get('/:id', postCtrl.findOneById)

// create one 
router.post('/', postCtrl.createOne)

// delete one
router.delete('/:id', postCtrl.deleteOne)
// delete by topicid
router.delete('/topic/:id', postCtrl.deletePostByTopicId)
// delete bu userid
router.delete('/user/:id', postCtrl.deletePostByUserId)

module.exports = router
