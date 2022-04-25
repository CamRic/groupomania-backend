const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { json } = require('express/lib/response')

// find all users
exports.findAll = (req, res) => {
    User.findAll()
        .then(users => res.status(200).json({ users }))
        .catch(err => res.status(400).json({ err }))
}

// find one user
exports.findOneById = (req, res) => {
    // User.findOne({where: {user_id: req.params.id}})
    //     .then(rawUser => {
    //         //var user = rawUser.JSON()
    //         res.status(200).json({ rawUser })
    //     })
    //     .catch(err => console.log(err))
    User.findOne({where: {user_id: req.params.id}})
        .then(user => res.status(200).json( {user} ))
        .catch(err => res.status(400).json({err}))
}

// add one user to db
exports.createOne = (req, res) => {
    
    if (!req.body) {
        res.status(400).json({ message: 'no body in request'})
    }
    bcrypt.hash(req.body.password, 10)
        .then(hashPass => {
            const user = User.build({
                email: req.body.email,
                password: hashPass,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
            })
            user.save()
                .then(() => res.status(201).json({ user }))
                .catch(err => res.status(400).json({ err }))
        })
        .catch(err => res.status(400).json({ error: 'cant hash password'}))
        
}

// login
exports.login = (req, res) => {
    User.findOne({ where: { email: req.body.email}})
        .then(user => {
            if (!user) {
                res.status(400).json({ err })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        res.status(400).json({ err })
                    }
                    res.status(200).json({
                        user_id: user.user_id,
                        user_firstName: user.first_name,
                        user_lastName: user.last_name,
                        user_email: user.email,
                        user_role: user.access_level,

                        token: jwt.sign(
                            {
                                user_id: user.user_id,
                                user_role: user.access_level
                            },
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '6h'}
                        )
                    })
                })
                .catch(() => res.status(400).json({ message: 'invalide password'}))
        })
        .catch(err => res.status(400).json({ err }))
        
}

// retrieve connection
exports.retrieveConnection = (req, res) => {
    
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, 'RANDOM_TOKEN_SECRET', (err, decoded) => {
        if (err) {
            res.status(401).json({ err: 'bad token' })
        }
        const userId = decoded.user_id
        User.findOne({where: {user_id: userId}})
            .then((user) => {
                res.status(200).json({
                    user_id: user.user_id,
                    user_firstName: user.first_name,
                    user_lastName: user.last_name,
                    user_email: user.email,
                    user_role: user.access_level,
                    token: jwt.sign(
                        {
                            user_id: user.user_id,
                            user_role: user.access_level
                        },
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '6h'}
                    )
                
                })
            })
            .catch(err => res.status(401).json({ err: 'cant retrieve connection, please login'}))
    })
}

// delete one user
exports.deleteOne = (req, res) => {
    User.destroy({where: {user_id: req.params.id }})
        .then((row) => {
            console.log(row)
            return res.status(204).json({ data: "user destroyed" })
        })
        .catch((err) => res.status(401).json({ err }))
}


// modify user
exports.updateOne = (req, res) => {
    let password;
    if (req.body.password) {
        bcrypt.hash(req.body.password, 10).then(hash => {
            password = hash
        })
    }
    const user = {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password,
    }
    // file system
    if (req.file) {
        console.log('file in req')
    }
    User.update(user, {where: {user_id: req.params.id}})
        .then(data => {
            if (data[0] === 0) {
                return res.status(404).json({ message: 'user not found' })
            }
            res.status(200).json({ message: 'user modified' })
        })
        .catch(err => res.status(500).json({ err }))
    // console.log(req.params.id)
    // if (!req.body) {
    //     return res.status(400).json({ message: 'no body in request'})
    // }
    // if (req.body.password.length > 3) {
    //     console.log('hashing password...')
    //     bcrypt.hash(req.body.password, 10)
    //         .then((hash) => {
    //             console.log('updating user...')
    //             User.update({
    //                 email: req.body.email,
    //                 first_name: req.body.first_name,
    //                 last_name: req.body.last_name,
    //                 password: hash
    //             },
    //             {
    //                 where: {user_id: req.params.id}
    //             })
    //                 .then((row) => res.status(202).json({ row }))
    //                 .catch((err) => res.status(401).json({err}))
    //         })
    //         .catch(err => res.status(401).json({ err }))
    // }
    // User.update({
    //         email: req.body.email,
    //         first_name: req.body.first_name,
    //         last_name: req.body.last_name,
    //     },
    //     {
    //         where: {user_id: req.params.id}
    //     })
    //         .then((row) => res.status(202).json({ row }))
    //         .catch(err => res.status(401).json({ err }))


    
}

// get user's topic
exports.findTopics = (req, res) => {
    
}