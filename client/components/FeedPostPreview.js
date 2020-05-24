/* eslint-disable complexity */
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Image, Button} from 'react-bootstrap'
import TimeAgo from 'react-timeago'
import {FullPicture, FeedPostComment} from './index'
import AddCommentFormFeed from './AddCommentFormFeed'
import ReactPlayer from 'react-player'
import Heart from 'react-animated-heart'
import history from '../history'
import {
  likeUserPostThunk,
  removeLikeUserPostThunk,
  dislikeUserPostThunk,
  deletePostThunk,
  undislikeUserPostThunk
} from '../store/generalUserFeed'
import {connect} from 'react-redux'

function PostingPictures(props) {
  const {post} = props
  const [showPicture, setShowPicture] = useState(false)

  if (post.videoUrl !== null) {
    return (
      <div className="vid-container">
        <ReactPlayer
          controls={true}
          width="100%"
          height="100%"
          url={post.videoUrl}
        />
      </div>
    )
  } else if (post.photos[0] !== undefined) {
    return (
      <div>
        <img
          src={post.photos[0].imgFile}
          className="post-images"
          onClick={() => setShowPicture(true)}
        />
        <FullPicture
          show={showPicture}
          image={post.photos[0].imgFile}
          onHide={() => setShowPicture(false)}
        />
      </div>
    )
  } else {
    return <div />
  }
}

function FeedPostPreview(props) {
  const [openComments, setOpenComment] = useState(false)
  const [commentForm, setCommentForm] = useState(false)
  const [isClick, setClick] = useState(false)
  const [isDislike, setDislike] = useState(false)

  function handleComments() {
    if (openComments) {
      setOpenComment(false)
    } else {
      setOpenComment(true)
    }
  }

  const {post} = props

  const likeClass = isClick ? 'likes-number-active' : 'likes-number-unactive'
  return (
    <div className="single-post-preview-container">
      {post.communityId ? (
        <Link
          className="link-to-community"
          to={`/community/list/${post.communityId}`}
        >
          <div className="community-post-label">{post.community.name}</div>
        </Link>
      ) : (
        ''
      )}
      <div key={post.id} className="single-post">
        <div className="inner-single-post">
          <div className="pfp-col">
            <Image
              className="post-pfp"
              onClick={() => history.push(`/u/${post.user.username}`)}
              src={post.user.profileImg}
              roundedCircle
            />
          </div>
          <div className="post-header">
            <div>
              <div className="post-info">
                <div className="post-handle">
                  <div className="post-info-inner">
                    <p
                      className="handle-text"
                      onClick={() => history.push(`/u/${post.user.username}`)}
                    >
                      {post.user.name}
                    </p>
                    <p
                      className="handle-text"
                      onClick={() => history.push(`/u/${post.user.username}`)}
                    >
                      @{post.user.username}
                    </p>
                  </div>
                  {post.user.username === props.loggedInUser ? (
                    <Button
                      className="delete-button"
                      variant="secondary"
                      onClick={() => props.deletePost(post.id)}
                    >
                      X
                    </Button>
                  ) : (
                    ''
                  )}
                </div>
                <div className="post-feed-preview-info">
                  <Link className="link-to-post" to={`/p/${post.id}`}>
                    <TimeAgo
                      className="time-ago"
                      date={post.createdAt}
                      live={false}
                    />
                    <p className="post-text">{post.description}</p>
                  </Link>
                </div>
              </div>
            </div>

            <div className="post-photos">
              <PostingPictures post={post} />
            </div>
            <div className="commentsAndShares">
              <img
                src="https://img.icons8.com/all/500/comments.png"
                className="commentIcon"
                type="button"
                onClick={() => setCommentForm(true)}
              />
              <AddCommentFormFeed
                show={commentForm}
                onHide={() => setCommentForm(false)}
                postId={post.id}
              />
              <div className="likes">
                {post.likes >= 1 && <p className={likeClass}>{post.likes}</p>}
                {isClick ? (
                  <Heart
                    className="likeIcon"
                    isClick={isClick}
                    onClick={() => {
                      setClick(false)
                      props.unlikePost(post.id)
                    }}
                  />
                ) : (
                  <Heart
                    className="likeIcon"
                    isClick={isClick}
                    onClick={() => {
                      setClick(true)
                      props.likePost(post.id)
                    }}
                  />
                )}
              </div>
              <div className="dislikes">
                {post.dislikes >= 1 && (
                  <p className="dislikes-number">{post.dislikes}</p>
                )}
                {isDislike ? (
                  <img
                    src="https://image.flaticon.com/icons/svg/2107/2107616.svg"
                    className="dislikeIcon"
                    type="button"
                    onClick={() => {
                      props.undislikePost(post.id)
                      setDislike(false)
                    }}
                  />
                ) : (
                  <img
                    src="https://image.flaticon.com/icons/svg/2107/2107616.svg"
                    className="dislikeIcon"
                    type="button"
                    onClick={() => {
                      props.dislikePost(post.id)
                      setDislike(true)
                    }}
                  />
                )}
              </div>
            </div>
            {post.postComments !== undefined && post.postComments.length ? (
              <div className="see-replies-container" onClick={handleComments}>
                <p className="seeReplies" type="button">
                  {post.postComments.length > 1
                    ? `${post.postComments.length} replies`
                    : '1 reply'}
                </p>
                <img
                  className="replies-button"
                  src="https://image.flaticon.com/icons/svg/271/271210.svg"
                />
              </div>
            ) : (
              <div className="see-replies-container">
                <p className="seeReplies">0 replies</p>
              </div>
            )}
          </div>
        </div>
        <FeedPostComment
          post={post}
          openComments={openComments}
          postId={post.id}
          loggedInUser={props.loggedInUser}
        />
      </div>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    likePost: postId => dispatch(likeUserPostThunk(postId)),
    unlikePost: postId => dispatch(removeLikeUserPostThunk(postId)),
    dislikePost: postId => dispatch(dislikeUserPostThunk(postId)),
    undislikePost: postId => dispatch(undislikeUserPostThunk(postId)),
    deletePost: postId => dispatch(deletePostThunk(postId))
  }
}

export default connect(null, mapDispatch)(FeedPostPreview)
