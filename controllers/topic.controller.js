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

// create one topic
exports.createOne = (req, res) => {
    const newTopic = Topic.build({
        user_id: req.body.user_id,
        title: req.body.title,
        body: req.body.topicBody
    })
    newTopic.save()
        .then(() => res.status(201).json({ topic: newTopic }))
        .catch(err => res.status(401).json({ err }))
}

// modify one²
exports.addPostId = (req, res) => {
    // Topic.findOne({where: {topic_id: req.params.topicid}})
    //     .then(topic => {
    //         console.log(topic)
    //         res.status(200).json({ topic })
    // })
    //     .catch(err => res.status(401).json({ err }))

    Topic.update({
        replies: req.body.replies,
    },{
        where: {topic_id: req.params.topicid}
    })
        .then((row) => res.status(202).json({ row }))
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