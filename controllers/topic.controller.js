const Topic = require('../models/topic.model')

// find all topics
exports.findAll = (req, res) => {
    Topic.findAll({order: [['createdAt', 'DESC']]})
        .then(topics => res.status(200).json({ topics }))
        .catch(err => res.status(401).json({ err }))
}

// find one topic
exports.findOneById = (req, res) => {
    Topic.findOne({ where: { topic_id: req.params.id }})
        .then(topic =>  res.status(200).json({ topic }))
        .catch(err => res.status(401).json({ err }))
}

// find user topic
exports.findByUser = (req, res) => {
    Topic.findAll({where: {user_id: req.params.id}})
        .then(topics => {
            res.status(201).json({ topics })
        })
        .catch(err => res.status(404).json({ err }))

}

// create one topic
exports.createOne = (req, res) => {
    var newTopic = null;
    // console.log(req)
    if (req.file) {
        console.log('with file')
        newTopic = Topic.build({
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            user_id: req.body.user_id,
            title: req.body.title,
            body: req.body.topicBody
        })
    } else {
        console.log('without file')
        newTopic = Topic.build({
            user_id: req.body.user_id,
            title: req.body.title,
            body: req.body.topicBody
        })
    }
    console.log(newTopic)
    newTopic.save()
        .then(() => res.status(201).json({ topic: newTopic }))
        .catch(err => res.status(401).json({ err }))
}

// modify one
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
    Topic.destroy({ where: { topic_id: req.params.id }})
                .then(row => {
                    res.status(200).json({message: 'topic destroyed'})
                })
                .catch(err => res.status(401).json({ err }))

}

exports.deleteByUserId = (req, res) => {
    if (req.auth.userId !== req.params.id && req.auth.userRole !== 'admin') {
        return res.status(404).json({ err: 'unauthorized request' })
    }
    Topic.destroy({where: {user_id: req.params.id}})
        .then(row => res.status(200).json({message: 'user topics destroyed'}))
        .catch(err => res.status(401).json({ err }))
}