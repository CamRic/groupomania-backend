const Sequelize = require('sequelize')
const sequelize = require('./db')

const Post = sequelize.define('Post', {
    post_id: {
        type: Sequelize.UUID,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.UUIDV4
    },
    topic_id: {
        type: Sequelize.UUID,
        allowNull: false
    },
    user_id: {
        type: Sequelize.UUID,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT, // ?
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Post'
})

module.exports = Post