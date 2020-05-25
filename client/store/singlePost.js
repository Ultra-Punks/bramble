import axios from 'axios'

// action types:
const GET_ALL_POSTS = 'GET_ALL_POSTS'
const GET_SINGLE_POST = 'GET_SINGLE_POST'
const DELETE_TAG = 'DELETE_TAG'

// action creator:
const getAllPosts = posts => {
  return {
    type: GET_ALL_POSTS,
    posts
  }
}

const getSinglePost = post => {
  return {
    type: GET_SINGLE_POST,
    post
  }
}

const deleteTag = tagId => ({type: DELETE_TAG, tagId})

// thunk creator (NOTE: this is a NAMED export! So deconstruct it!)
export const fetchAllPosts = () => {
  return async dispatch => {
    const res = await axios.get('api/posts')
    dispatch(getAllPosts(res.data))
  }
}

export const fetchSinglePost = postId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/posts/${postId}`)
      dispatch(getSinglePost(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchRandomPosts = ids => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/posts/random`, {
        postIds: ids
      })
      dispatch(getAllPosts(data))
    } catch (error) {
      console.log('Error ', error)
    }
  }
}

export const deleteTagThunk = tagId => {
  return async () => {
    try {
      await axios.delete(`/api/tags/${tagId}`)
    } catch (error) {
      console.error(error)
    }
  }
}

// LIKE a post thunk creator
export const likedPost = postId => {
  return async function(dispatch) {
    try {
      let res = await axios.put(`/api/posts/${postId}/likes`)
      dispatch(likedPost(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

// DISLIKE a post thunk creator
export const dislikedPost = postId => {
  return async function(dispatch) {
    try {
      let res = await axios.put(`/api/post/${postId}/dislikes`)
      dispatch(dislikedPost(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

// initial state:
const initialState = {}

// create our reducer here:
export default function singlePostReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.posts
    case GET_SINGLE_POST:
      return action.post
    default:
      return state
  }
}
