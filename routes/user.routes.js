const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user.controller')
const auth = require('../middleware/auth')

// get all users
router.get('/', auth, userCtrl.findAll)

// get one user
router.get('/:id', auth, userCtrl.findOneById)

// create one user
router.post('/signup', userCtrl.createOne)

// connection
router.post('/login', userCtrl.login)
router.post('/retrieve', userCtrl.retrieveConnection)

// delete one
router.delete('/:id', auth, userCtrl.deleteOne)

// update one
router.put('/:id', auth, userCtrl.updateOne)

module.exports = router