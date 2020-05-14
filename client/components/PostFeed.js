/* eslint-disable react/jsx-key */
import React from 'react'
import {Image} from 'react-bootstrap'
// import axios from 'axios'

export default function PostFeed(props) {
  if (props.postFeed) {
    return (
      <div className="feedView">
        {Array.isArray(props.posts) &&
          props.posts.map(post => {
            return (
              <div key={post.id} className="single-post">
                <div className="post-header">
                  <Image
                    className="post-pfp"
                    src={props.profile.profileImg}
                    roundedCircle
                  />
                  <div className="post-info">
                    <div className="post-handle">
                      <p className="handle-text">{props.profile.name}</p>
                      <p className="handle-text">@{props.profile.username}</p>
                    </div>
                    <p className="post-text">{post.description}</p>
                  </div>
                </div>
                <div className="post-photos">
                  <img
                    src="https://img.freepik.com/free-photo/blue-mountains-famous-tourism-scenery-lijiang_1417-1143.jpg?size=626&ext=jpg"
                    className="post-images"
                  />
                </div>
                <div className="commentsAndShares">
                  <img
                    src="https://img.icons8.com/all/500/comments.png"
                    className="commentIcon"
                  />
                </div>
                <br />
              </div>
            )
          })}
      </div>
    )
  } else {
    return (
      <div className="gallery-container">
        {props.images.map(image => {
          return (
            <img
              key={image.filename}
              className="gallery-photo"
              src={image.url}
            />
          )
        })}
      </div>
    )
  }
}
