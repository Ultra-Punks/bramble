/* eslint-disable camelcase */
const router = require('express').Router()
const cloudinary = require('cloudinary').v2
const {cloudName, apiKey, apiSecret} = require('../../secrets')

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
})

module.exports = router

router.get('/all/:username', async (req, res, next) => {
  try {
    const user = req.params.username
    await cloudinary.search
      .expression(`user_uploads/${user}`)
      .with_field('context')
      .with_field('tags')
      .max_results(10)
      .execute()
      .then(result => res.json(result.resources))
  } catch (err) {
    next(err)
  }
})
