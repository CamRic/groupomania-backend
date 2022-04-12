const Topic = require('../models/topic.model')

// find all topics
exports.findAll = (req, res) => {
    Topic.findAll()
        .then(topics => res.status(200).json({ topics }))
        .catch(err => res.status(401).json({ err }))
}

// find one topic
exports.findOneById = (req, res) => {
    Topic.findOne({ where: { topic_id: req.params.id }})
        .then(topic =>  res.status(200).json({ topic }))
        .catch(err => res.status(401).json({ err }))
}

// delete one topic
exports.deleteOne = (req, res) => {
    Topic.deleteOne({ where: { topic_id: req.params.id }})
        .then(topic => {
            topic.destroy()
                .then(() => res.status(200).json({ message: 'user removed from db' }))
                .catch(err => res.status(400).json({ err }))
        })
        .catch(err => res.status(401).json({ err }))
}