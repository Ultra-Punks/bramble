import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProfile} from '../store/singleProfile'
import {fetchUserPosts} from '../store/userFeed'
// import {fetchComments} from '../store/postComments'
// import {fetchSingleComment} from '../store/singleComment'
import {PostFeed, Map} from './index'
import {Image, Button} from 'react-bootstrap'

class ProfileView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postFeed: true
      // openComments: false,
    }
    this.postSelector = this.postSelector.bind(this)
    this.gallerySelector = this.gallerySelector.bind(this)
    // this.handleComments = this.handleComments.bind(this)
  }
  componentDidMount() {
    this.props.fetchProfile()
    this.props.fetchUserPosts()
    // this.props.fetchComments()
  }

  postSelector() {
    this.setState({postFeed: true})
  }

  gallerySelector() {
    this.setState({postFeed: false})
  }

  render() {
    // console.log('PROPS from Profile View >>>> ', this.props)
    const postId = this.props.posts[0] ? this.props.posts[0].id : null
    // const posts = this.props.posts.length ? this.props.posts[0].id : null

    // console.log('POST ID>>>>>>', postId)
    const profile = this.props.profile
    const postClass = this.state.postFeed
      ? 'profileFeedButton selected-feed'
      : 'profileFeedButton'

    const galleryFeed = !this.state.postFeed
      ? 'profileFeedButton selected-feed'
      : 'profileFeedButton'
    return (
      <div className="profileContainer">
        <div className="profileImgContentContainer">
          <Image
            className="profilePagePhoto"
            src={profile.profileImg}
            roundedCircle
          />
          <div className="profileInfo">
            <div>
              <p className="profile-name">{profile.name}</p>
              <p className="profile-username">@{profile.username}</p>
            </div>
          </div>
          <div className="underline">
            <p className="profileBio">{profile.description}</p>
          </div>
          <div className="profile-follows">
            <p className="first-list">Followers: {profile.followers}</p>
            <p className="profile-info-text">Following: {profile.following}</p>
            <p className="profile-info-text">Communities</p>
          </div>
          <Button className="follow-button" variant="outline-light">
            Follow
          </Button>
          <div className="contentContainer">
            <div className="buttonContainer">
              <Button
                variant="link"
                className={postClass}
                onClick={() => this.postSelector()}
              >
                Posts
              </Button>
              <Button
                variant="link"
                className={galleryFeed}
                onClick={() => this.gallerySelector()}
              >
                Gallery
              </Button>
            </div>
            <div>
              <PostFeed
                postFeed={this.state.postFeed}
                images={this.props.gallery}
                posts={this.props.posts}
                profile={this.props.profile}
                handleComments={this.handleComments}
                openComments={this.state.openComments}
              />
            </div>
          </div>
        </div>
        <div className="profileMapContainer sticky">
          <Map />
          {/* <img
          src="https://miro.medium.com/max/4064/1*qYUvh-EtES8dtgKiBRiLsA.png"
          className="profileMapContainer sticky"
        /> */}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  console.log('STATE from profile view!>>>', state)
  return {
    profile: state.singleProfile,
    posts: state.userPosts
    // commentsOnPosts: state.postComments,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const username = ownProps.match.params.username

  return {
    fetchProfile: () => dispatch(fetchProfile(username)),
    fetchUserPosts: () => dispatch(fetchUserPosts(username))
    // fetchComments: () => dispatch(fetchComments()),
    // fetchSingleComment: () => dispatch(fetchSingleComment())
  }
}

export default connect(mapState, mapDispatch)(ProfileView)
