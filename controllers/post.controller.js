const Post = require('../models/post.model')
const Topic = require('../models/topic.model')

// find all topics
exports.findAll = (req, res) => {
    Post.findAll()
        .then(posts => res.status(200).json({ posts }))
        .catch(err => res.status(401).json({ err }))
}

// find one topic
exports.findOneById = (req, res) => {
    Post.findOne({ where: { post_id: req.params.id }})
        .then(post =>  res.status(200).json({ post }))
        .catch(err => res.status(401).json({ err }))
}

exports.findAllInTopic = (req, res) => {
    Post.findAll({where: {topic_id: req.params.id}})
        .then(posts => res.status(200).json({ posts }))
        .catch(err => res.status(400).json({ err }))
}

// create one post
exports.createOne = (req, res) => {
    const newPost = Post.build({
        topic_id: req.body.topic_id,
        user_id: req.body.user_id,
        body: req.body.body
    })
    newPost.save()
        .then(() => res.status(201).json({newPost}))
        .catch(err => res.status(401).json({ err }))
}

// delete one post
exports.deleteOne = (req, res) => {
    Post.findOne({where: {post_id: req.params.id}})
        .then(post => {
            let author_id = post.data.post.user_id
            if (req.auth.userId !== author_id && req.auth.userRole !== 'admin') {
                return res.status(401).json({ message: 'unauthorized request' })
            }
            Post.destroy({where: {post_id: req.params.id}})
                .then(row => res.status(203).json({message: 'post deleted', atRow: row}))
                .catch(err => res.status(400).json({err}))
        })
        .catch(err => res.status(404).json({ err: 'ressource not found' }))
   
}

// delete topic posts
exports.deletePostByTopicId = (req, res) => {
    console.log('========>' + req.params.id)
    Topic.findOne({where: {topic_id: req.params.id}})
        .then(topic => {
            let author_id = topic.data.topic.user_id
            console.log(author_id)
            if (req.auth.userId !== author_id && req.auth.userRole !== 'admin') {
                return res.status(401).json({ message: 'unauthorized request' })
            }
            Post.destroy({where: {topic_id: req.params.id}})
                .then(row => res.status(200).json({message: 'posts deleted'}))
                .catch(err => res.status(400).json({err}))
        })
        .catch(err => res.status(404).json({ err }))
}

// delete user posts
exports.deletePostByUserId = (req, res) => {
    if (req.auth.userId !== req.params.id && req.auth.userRole !== 'admin') {
        return res.status(401).json({ message: 'unauthorized request' })
    }
    Post.destroy({where: {user_id: req.params.id}})
        .then(row => res.status(200).json({message: 'user topics destroyed'}))
        .catch(err => res.status(401).json({ err }))
}