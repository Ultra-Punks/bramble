import axios from 'axios'

// action types:
const GET_PROFILE = 'GET_PROFILE'
const GET_PROFILE_LOCATIONS = 'GET_PROFILE_LOCATIONS'

// action creator:
const getProfile = profile => {
  return {
    type: GET_PROFILE,
    profile
  }
}

const getProfileLocations = locations => {
  return {
    type: GET_PROFILE_LOCATIONS,
    locations
  }
}

// thunk creator (NOTE: this is a NAMED export! So deconstruct it!)
export const fetchProfile = username => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${username}`)
      dispatch(getProfile(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchProfileLocations = username => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/locations/from/${username}`)
      dispatch(getProfileLocations(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addNewFollower = username => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/follow/user`, {
        username: username
      })
      dispatch(getProfile(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const unfollowUserThunk = username => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/unfollow/user`, {
        username: username
      })
      dispatch(getProfile(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// initial state:
const initialState = {
  profile: {},
  locations: [],
  isFollowing: false
}

// create our reducer here:
export default function singleProfileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {...state, ...action.profile}
    case GET_PROFILE_LOCATIONS:
      return {...state, locations: action.locations}
    default:
      return state
  }
}
