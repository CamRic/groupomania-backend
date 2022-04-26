const Post = require('../models/post.model')

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

// create one topic
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

// delete one topic
exports.deleteOne = (req, res) => {
    Post.destroy({where: {post_id: req.params.id}})
        .then(row => res.status(203).json({message: 'post deleted'}))
        .catch(err => res.status(400).json({err}))
   
}

exports.deletePostByTopicId = (req, res) => {
    Post.destroy({where: {topic_id: req.params.id}})
        .then(row => res.status(200).json({message: 'posts deleted'}))
        .catch(err => res.status(400).json({err}))
}

exports.deletePostByUserId = (req, res) => {
    Post.destroy({where: {user_id: req.params.id}})
        .then(row => res.status(200).json({message: 'user topics destroyed'}))
        .catch(err => res.status(401).json({ err }))
}