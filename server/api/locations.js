const router = require('express').Router()
const {Location} = require('../db/models')
const Op = require('sequelize').Op
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    //below will only return locations with coordinates
    const locations = await Location.findAll({
      where: {point: {[Op.ne]: null}}
    })
    // const locations = await Location.findAll()
    res.json(locations)
  } catch (err) {
    next(err)
  }
})
