const Sequelize = require('sequelize')
const db = require('../db')

const Community = db.define('community', {
  name: {
    type: Sequelize.STRING,
    // unique: true,
    // allowNull: false,
    validate: {
      notEmpty: true
      // isAlphanumeric: true,
    }
  },
  description: {
    type: Sequelize.TEXT,
    // allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  profileImg: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://image.shutterstock.com/image-vector/group-five-people-community-icon-260nw-455816902.jpg'
  },
  subscribers: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Community
