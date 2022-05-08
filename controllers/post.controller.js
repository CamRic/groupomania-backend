const Post = require('../models/post.model')

// find all topics
exports.findAll = (req, res) => {
    Post.findAll()
        .then(posts => res.status(200).json({ posts }))
        .catch(err => res.status(404).json({ err }))
}

// find one topic
exports.findOneById = (req, res) => {
    Post.findOne({ where: { post_id: req.params.id }})
        .then(post =>  res.status(200).json({ post }))
        .catch(err => res.status(404).json({ err }))
}

exports.findAllInTopic = (req, res) => {
    Post.findAll({where: {topic_id: req.params.id}})
        .then(posts => res.status(200).json({ posts }))
        .catch(err => res.status(404).json({ err }))
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
        .catch(err => res.status(400).json({ err }))
}

exports.updateOne = (req, res) => {
    Post.findOne({ where: { post_id: req.params.id }})
        .then(response => {
            if (response.user_id !== req.auth.userId && req.auth.userRole !== 'admin') {
                res.status(401).json({ message: 'unauthorized request' })
            }
            var post = {
                body: req.body.body
            }
            Post.update(post, { where: { post_id: req.params.id }})
                .then(data => {
                    if (data[0] === 0) {
                        return res.status(404).json({ message: 'topic not found' })
                    }
                    res.status(200).json({ post })
                })
                .catch(err => res.status(400).json({ err }))
        })
        .catch(err => res.status(404).json({ err }))
}

// delete one post
exports.deleteOne = (req, res) => {
    Post.findOne({ where: { post_id: req.params.id }})
        .then(response => {
            if (response.user_id !== req.auth.userId && req.auth.userRole !== 'admin') {
                res.status(401).json({ message: 'unauthorized request' })
            }
            Post.destroy({where: {post_id: req.params.id}})
                .then(row => res.status(200).json({message: 'post deleted', atRow: row}))
                .catch(err => res.status(404).json({err}))

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
        .catch(err => res.status(404).json({ err }))
}