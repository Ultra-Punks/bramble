import React, {Component} from 'react'
import {Image, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  likeProfileCommentThunk,
  dislikeProfileCommentThunk,
  deleteCommentThunk
} from '../store/userFeed'
import styled from 'styled-components'

// NOTE: Icons only placeholders. Found them on this site: https://icons8.com/icons/set/like-heart
const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2%;
`

function PostComments(props) {
  const {post, openComments} = props
  if (
    post !== undefined &&
    post.postComments !== undefined &&
    post.postComments.length &&
    openComments
  ) {
    const postComments = post.postComments
    return (
      <div className="commentPreviewContainer">
        {postComments.map(comment => (
          <div key={comment.id} className="singleCommentPreview">
            <CommentHeader>
              <Image
                className="post-pfp"
                src={comment.user.profileImg}
                roundedCircle
              />
              {/* <div className="post-handle"> */}
              <Link to={`/u/${comment.user.username}`}>
                <p className="handle-text">{comment.user.name}</p>
              </Link>
              <Link to={`/u/${comment.user.username}`}>
                <p className="handle-text">@{comment.user.username}</p>
              </Link>
              {/* </div> */}
            </CommentHeader>
            <Link to={`/comments/${comment.id}`}>{comment.comment}</Link>
            <div className="commentShareBar">
              <div>
                {comment.likes >= 1 && (
                  <div style={{paddingLeft: '13px', marginBottom: '-25px'}}>
                    {comment.likes}
                  </div>
                )}
                <img
                  src="https://img.icons8.com/ios/64/000000/like.png"
                  className="likeIcon"
                  type="button"
                  onClick={() => props.likeComment(comment.id, post.id)}
                />
              </div>
              <div>
                {comment.dislikes >= 1 && (
                  <div style={{paddingLeft: '13px', marginBottom: '-25px'}}>
                    {comment.dislikes}
                  </div>
                )}
                <img
                  src="https://img.icons8.com/windows/80/000000/dislike.png"
                  className="dislikeIcon"
                  type="button"
                  onClick={() => props.dislikeComment(comment.id, post.id)}
                />
              </div>
              {comment.user.username === props.loggedInUser ? (
                <Button
                  className="delete-button"
                  variant="danger"
                  onClick={() => props.deleteComment(comment.id, post.id)}
                >
                  X
                </Button>
              ) : (
                ''
              )}
            </div>
          </div>
        ))}
      </div>
    )
  } else {
    return <div />
  }
}

const mapDispatch = dispatch => {
  return {
    likeComment: (commentId, postId) =>
      dispatch(likeProfileCommentThunk(commentId, postId)),
    dislikeComment: (commentId, postId) =>
      dispatch(dislikeProfileCommentThunk(commentId, postId)),
    deleteComment: (commentId, postId) =>
      dispatch(deleteCommentThunk(commentId, postId))
  }
}

export default connect(null, mapDispatch)(PostComments)
