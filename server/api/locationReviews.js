const router = require('express').Router()
const {LocationReview, Location, User} = require('../db/models')

module.exports = router

// get all reviews
router.get('/', async (req, res, next) => {
  try {
    const allReviews = await LocationReview.findAll()
    res.json(allReviews)
  } catch (error) {
    next(error)
  }
})

// get single review according to reviewId
router.get('/:reviewId', async (req, res, next) => {
  try {
    const singleReview = await LocationReview.findByPk(req.params.reviewId)
    res.json(singleReview)
  } catch (error) {
    next(error)
  }
})

// REVISIT...NOT WORKING CURRENTLY...
// get all reviews of a specific location
router.get('/of/:locationId', async (req, res, next) => {
  try {
    const locationReviews = await Location.findOne({
      where: {
        locationId: req.params.locationId
      },
      include: [{model: Location}]
    })
    res.json(locationReviews)
  } catch (error) {
    next(error)
  }
})

// REVISIT...NOT WORKING CURRENTLY...
// get all reviews from a specific user
router.get('/from/:username', async (req, res, next) => {
  try {
    const allUserReviews = await User.findOne({
      where: {
        username: req.params.username
      },
      include: [{model: LocationReview}]
    })
    res.json(allUserReviews.locationReviews)
  } catch (error) {
    next(error)
  }
})

// delete a review by Id
router.delete('/:reviewId', async (req, res, next) => {
  try {
    const numOfDeleted = await LocationReview.destroy({
      where: {id: req.params.reviewId}
    })
    res.status(200).json(numOfDeleted)
  } catch (error) {
    next(error)
  }
})
