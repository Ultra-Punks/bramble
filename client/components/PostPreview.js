import React, {useState} from 'react'
import PostComment from './PostComment'
import {Link} from 'react-router-dom'
import {FullPicture} from './index'
import {Image} from 'react-bootstrap'
import TimeAgo from 'react-timeago'
import history from '../history'
import AddCommentForm from './AddCommentForm'

function PostingPictures(props) {
  const {post} = props
  const [showPicture, setShowPicture] = useState(false)
  if (post.photos[0] !== undefined) {
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

export default function PostPreview(props) {
  const [openComments, setOpenComment] = useState(false)
  const [commentForm, setCommentForm] = useState(false)
  function handleComments() {
    if (openComments) {
      setOpenComment(false)
    } else {
      setOpenComment(true)
    }
  }

  const {post, profile} = props
  console.log('this is the propsss>>>>', props)
  return (
    <div className="single-post-preview-container">
      {post.communityId ? (
        <div className="community-post-label">{post.community.name}</div>
      ) : (
        ''
      )}
      <div key={post.id} className="single-post">
        <div className="pfp-col">
          <Image className="post-pfp" src={profile.profileImg} roundedCircle />
        </div>
        <div className="post-header">
          <div className="post-info">
            <div className="post-handle">
              <p className="handle-text">{profile.name}</p>
              <p className="handle-text">@{profile.username}</p>
            </div>
            <Link className="link-to-post" to={`/p/${post.id}`}>
              <TimeAgo
                className="time-ago"
                date={post.createdAt}
                live={false}
              />
              <p className="post-text">{post.description}</p>
            </Link>
          </div>

          <div className="post-photos">
            <PostingPictures post={post} />
          </div>
          <div className="commentsAndShares">
            <div className="commentRepliesContainer">
              <img
                src="https://img.icons8.com/all/500/comments.png"
                className="commentIcon"
                type="button"
                onClick={() => setCommentForm(true)}
              />
              <AddCommentForm
                show={commentForm}
                onHide={() => setCommentForm(false)}
                postId={post.id}
              />

              {post.postComments !== undefined && post.postComments.length ? (
                <p
                  className="seeReplies"
                  type="button"
                  onClick={handleComments}
                >
                  {post.postComments.length > 1
                    ? `See ${post.postComments.length} replies`
                    : 'See 1 reply'}
                </p>
              ) : (
                <p className="seeReplies">0 replies</p>
              )}
            </div>
            <div className="likes">
              {post.likes >= 1 && (
                <div style={{paddingLeft: '13px', marginBottom: '-25px'}}>
                  {post.likes}
                </div>
              )}
              <img
                src="https://img.icons8.com/ios/64/000000/like.png"
                className="likeIcon"
                type="button"
              />
            </div>
            <div className="dislikes">
              {post.dislikes >= 1 && (
                <div style={{paddingLeft: '13px', marginBottom: '-25px'}}>
                  {post.dislikes}
                </div>
              )}
              <img
                src="https://img.icons8.com/windows/80/000000/dislike.png"
                className="dislikeIcon"
                type="button"
                // onClick={() => this.dislikeComment()}
              />
            </div>
          </div>
          <br />
          <PostComment post={post} openComments={openComments} />
        </div>
      </div>
    </div>
  )
}
