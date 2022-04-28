const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post.controller')
const auth = require('../middleware/auth')

// get all posts
router.get('/', auth, postCtrl.findAll)
// get all topic posts
router.get('/topic/:id', auth, postCtrl.findAllInTopic)

// get one post
router.get('/:id', auth, postCtrl.findOneById)

// create one 
router.post('/', auth, postCtrl.createOne)

// delete one
router.delete('/:id', auth, postCtrl.deleteOne)
// delete bu userid
router.delete('/user/:id', auth, postCtrl.deletePostByUserId)

module.exports = router
