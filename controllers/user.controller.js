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
    User.findOne({where: {user_id: req.params.id}})
        .then(user => res.status(201).json({ user }))
        .catch(err => console.log(err))
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

                        token: jwt.sign(
                            {user_id: user.user_id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '60'}
                        )
                    })
                })
                .catch(() => res.status(400).json({ message: 'invalide password'}))
        })
        .catch(err => res.status(400).json({ err }))
        
}

// delete one user
exports.deleteOne = (req, res) => {
    // User.findOne({where: { user_id: req.params.id }})
    //     .then((user) => {
    //         user.destroy()
    //             .then((res) => res.status(200).json({ message: 'user removed from db' }))
    //             .catch(err => res.status(400).json({ message: 'error destroying user' }))
    //     })
    //     .catch(err => res.status(400).json({ message: 'error finding user' }))

    // User.destroy({where: {user_id: req.params.id }})
    //     .then((res) => res.status(204).json({ message: 'user destroyed'}))
    //     .catch(() => res.status(401).json({ error: 'error destroying user'}))

    User.destroy({where: {user_id: req.params.id }})
        .then((row) => {
            console.log(row)
            res.status(204).json({message: `user destroyed at row ${row}`})
        }).catch(() => res.status(401).json({ error: 'error destroying user'}))
}

exports.updateOne = (req, res) => {
    User.findOne({ where: { user_id: req.params.id }})
        .then(user => {
            user.email = req.body.email
            user.save()
                .then(() => res.status(200).json({ message: 'user updated in db'}))
                .catch(err => res.status(400).json({ err }))
        })
        .catch(err => res.status(400).json({ err }))
    
}
/*

/*
// deleting one user
exports.deleteUser = (req, res) => {
    

    Utilisateur.deleteOne(req.params.id, (err, data) => {
        if (err) {
            if (err.kind == 'not_found') res.status(404).send({message: `user(${req.params.id}) not found`})
            else res.status(500).send({message: `Could not delete user(${req.params.id})`})
        } else {
            res.send({message: 'user was deleted successfully!'})
        }

    })

}

// updating one user
exports.updateOne = (req, res) => {
    // valide request
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty!' })
    }
    console.log(req.body)
    Utilisateur.updateById(req.params.id, new Utilisateur(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `user(${req.params.id}) not found`})
            } else {
                res.status(500).send({ message: `error updating user(${req.params.id})`})
            }
        } else {
            res.send(data)
        }
    })
}

*/