const Topic = require('../models/topic.model')
const fs = require('fs')

// find all topics
exports.findAll = (req, res) => {
    Topic.findAll({order: [['createdAt', 'DESC']]})
        .then(topics => res.status(200).json({ topics }))
        .catch(err => res.status(404).json({ err }))
}

// find one topic
exports.findOneById = (req, res) => {
    Topic.findOne({ where: { topic_id: req.params.id }})
        .then(topic =>  res.status(200).json({ topic }))
        .catch(err => res.status(404).json({ err }))
}

// find user topic
exports.findByUser = (req, res) => {
    Topic.findAll({where: {user_id: req.params.id}})
        .then(topics => {
            res.status(200).json({ topics })
        })
        .catch(err => res.status(404).json({ err }))

}

// create one topic
exports.createOne = (req, res) => {
    var newTopic = Topic.build({
        user_id: req.body.user_id,
        title: req.body.title,
        body: req.body.topicBody
    });
    if (req.file) {
        newTopic.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    newTopic.save()
        .then(() => res.status(201).json({ topic: newTopic }))
        .catch(err => res.status(400).json({ err }))
}

// modify one topic
exports.modifyOne = (req, res) => {
    Topic.findOne({ where: { topic_id: req.params.id }})
        .then(response => {
            console.log(response.topic_id)
            let topicAuthor = response.user_id
            if (topicAuthor !== req.auth.userId && req.auth.userRole !== 'admin') {
                res.status(401).json({message: 'unauthorized request'})
            }
            var topic = {
                title: req.body.title,
                body: req.body.topicBody,
            }
            if (req.file) {
                topic.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }
            console.log(topic)
            Topic.update(topic, { where: { topic_id: req.params.id }})
                .then(data => {
                    if (data[0] === 0) {
                        return res.status(404).json({ message: 'topic not found' })
                    }
                    res.status(200).json({ topic })
                })
                .catch(err => res.status(400).json({ err }))
        })
        .catch(err => res.status(404).json({ err }))

}

// delete one topic
exports.deleteOne = (req, res) => {
    Topic.findOne({ where: { topic_id: req.params.id }})
        .then(response => {
            if (response.user_id !== req.auth.userId && req.auth.userRole !== 'admin') {
                return res.status(401).json({ message: 'unauthorized request' })
            }
            Topic.destroy({ where: { topic_id: req.params.id }})
                .then(row => {
                    try {
                        fs.unlinkSync(response.imageUrl.substring(22, ))
                    } catch(err) {
                        console.log(err)
                    }
                    res.status(200).json({message: 'topic destroyed'})
                })
                .catch(err => res.status(400).json({ err }))
        })
        .catch(err => res.status(404).json({ err }))
}

exports.deleteByUserId = (req, res) => {
    if (req.auth.userId !== req.params.id && req.auth.userRole !== 'admin') {
        return res.status(404).json({ err: 'unauthorized request' })
    }
    Topic.destroy({where: {user_id: req.params.id}})
        .then(row => res.status(200).json({message: 'user topics destroyed'}))
        .catch(err => res.status(400).json({ err }))
}