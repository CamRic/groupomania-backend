const Sequelize = require('sequelize')
const sequelize = require('./db')

const Topic = sequelize.define('Topic', {
    topic_id: {
        type: Sequelize.UUID,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.UUIDV4
    },
    user_id: {
        type: Sequelize.UUID,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT, // ?
        allowNull: false
    },
    replies: {
        type: Sequelize.JSON,
        defaultValue: {"replies": []}
    }
}, {
    sequelize,
    modelName: 'Topic'
})

module.exports = Topic