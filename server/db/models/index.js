const User = require('./user')
const Location = require('./location')
const LocationReview = require('./locationReview')
const Community = require('./community')
const CommunityMods = require('./communityMod')
const CommunitySubs = require('./communitySubs')
const Photo = require('./photos')
const PostComment = require('./postComment')
const UserFollowers = require('./userFollowers')
const UserPost = require('./userPost')
const Tags = require('./tags')

// =========== ASSOCIATIONS BELOW ===========

UserPost.belongsTo(User)
UserPost.hasMany(PostComment)
UserPost.hasMany(Photo)
UserPost.hasMany(Tags)

PostComment.belongsTo(UserPost)
PostComment.belongsTo(User)
PostComment.hasMany(Photo)

Location.hasMany(Photo)
Location.belongsTo(User)
Location.hasMany(LocationReview)
Location.belongsTo(Community)

LocationReview.belongsTo(Location)
LocationReview.belongsTo(User)
LocationReview.hasMany(Photo)

Photo.belongsTo(UserPost)
Photo.belongsTo(Location)
Photo.belongsTo(LocationReview)
Photo.belongsTo(PostComment)
Photo.belongsTo(User)
Photo.hasMany(Tags)

Community.belongsToMany(User, {through: CommunitySubs})
Community.belongsTo(User)
Community.hasMany(Location)

User.hasMany(UserPost)
User.hasMany(Photo)
User.hasMany(Location) // <-- NOTE: was creating some issues Sat. May need review later.
User.hasMany(LocationReview)
User.hasMany(PostComment)
User.belongsToMany(User, {as: 'Followers', through: UserFollowers})
User.belongsToMany(Community, {as: 'Subscribers', through: CommunitySubs})
User.belongsToMany(Community, {as: 'Moderator', through: CommunityMods})

Tags.belongsTo(UserPost)
Tags.belongsTo(User)
Tags.belongsTo(Photo)

// =========== Exports Below ===========
module.exports = {
  User,
  Community,
  CommunityMods,
  CommunitySubs,
  Location,
  LocationReview,
  Photo,
  PostComment,
  UserFollowers,
  UserPost
}
