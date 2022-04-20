const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post.controller')
const auth = require('../middleware/auth')

// get all posts
router.get('/', postCtrl.findAll)

// get one post
router.get('/:id', postCtrl.findOneById)

// create one 
router.post('/', postCtrl.createOne)

// delete one
router.delete('/:id', postCtrl.deleteOne)

module.exports = router
