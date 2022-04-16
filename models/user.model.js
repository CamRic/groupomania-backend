const Sequelize = require('sequelize')
const sequelize = require('./db')

const User =  sequelize.define('User', {
    user_id: {
        type: Sequelize.UUID,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.UUIDV4
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    access_level: {
        type: Sequelize.ENUM('admin, user'),
        defaultValue: 'user'
    },
    topics: {
        type: Sequelize.JSON,
        defaultValue: {"topics": []}
    },
    posts: {
        type: Sequelize.JSON,
        defaultValue: {"posts": []}
    },
    favorites: {
        type: Sequelize.JSON,
        defaultValue: {"favorites": []}
    }
}, {
    sequelize,
    modelName: 'User'
})

module.exports = User