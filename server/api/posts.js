/* eslint-disable camelcase */
const router = require('express').Router()
const {scanner} = require('../imageRec')

const {
  UserPost,
  User,
  Photo,
  Community,
  Tag,
  PostComment
} = require('../db/models')

module.exports = router

//gets all posts
router.get('/', async (req, res, next) => {
  try {
    const allPosts = await UserPost.findAll({
      include: [{model: Photo, include: [{model: Tag}]}]
    })
    res.json(allPosts)
  } catch (error) {
    next(error)
  }
})

//gets single post according to postId
router.get('/:postId', async (req, res, next) => {
  try {
    const singlePost = await UserPost.findByPk(req.params.postId, {
      include: [{model: Photo, include: {model: Tag}}, {model: User}]
    })
    res.json(singlePost)
  } catch (error) {
    next(error)
  }
})

//gets all posts from specific user
router.get('/from/:username', async (req, res, next) => {
  try {
    const allUserPosts = await User.findOne({
      where: {
        username: req.params.username
      },
      include: [
        {
          model: UserPost,
          include: [
            {model: Photo, include: [{model: Tag}]},
            {model: PostComment}
          ]
        }
      ]
    })
    res.json(allUserPosts.userPosts)
  } catch (error) {
    next(error)
  }
})

//gets all posts for specific community
router.get('/for/:communityPost', async (req, res, next) => {
  try {
    const allCommunityPosts = await Community.findOne({
      where: {
        id: req.params.communityPost
      },
      include: [{model: UserPost}]
    })
    res.json(allCommunityPosts)
  } catch (error) {
    next(error)
  }
})

//creates new post according to user
router.post('/add/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    })

    let newPost = await UserPost.create({
      userId: user.id,
      description: req.body.description
    })

    if (req.body.photo) {
      const newPhoto = await Photo.create({
        userPostId: newPost.id,
        userId: user.id,
        imgFile: req.body.photoInfo
      })

      const scannedLabels = await scanner(req.body.photoInfo)

      scannedLabels.forEach(label => {
        Tag.create({
          imageTag: label,
          userPostId: newPost.id,
          photoId: newPhoto.id,
          userId: user.id
        })
      })

      const postWithPics = await UserPost.findByPk(newPost.id, {
        include: [{model: Photo, include: [{model: Tag}]}]
      })

      res.json(postWithPics)
    } else {
      newPost = await UserPost.findByPk(newPost.id, {
        include: [{model: Photo}]
      })

      res.json(newPost)
    }
  } catch (error) {
    next(error)
  }
})

//delete post by Id
router.delete('/:postId', async (req, res, next) => {
  try {
    const numOfDeleted = await UserPost.destroy({
      where: {id: req.params.postId}
    })
    res.status(200).json(numOfDeleted)
  } catch (error) {
    next(error)
  }
})
