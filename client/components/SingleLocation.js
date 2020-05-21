import React from 'react'
import {connect} from 'react-redux'
import {fetchOneLocation, addLocationReviewThunk} from '../store/singleLocation'
import {Link} from 'react-router-dom'
import {Image, Modal} from 'react-bootstrap'
import {Map, LocationReviews, AddLocationReview} from './index'
import MapGL from 'react-map-gl'
import {mapboxToken} from '../../secrets'

function PostingPictures(props) {
  const {post} = props
  if (post !== undefined && post.photos !== undefined && post.photos.length) {
    return (
      <div className="img-container">
        <img src={post.photos[0].imgFile} className="single-post-view-img" />
      </div>
    )
  } else {
    return <div />
  }
}

function UserPFP(props) {
  const {post} = props

  if (
    post !== undefined &&
    post.user !== undefined &&
    post.user.profileImg !== undefined
  ) {
    return (
      <Image className="post-pfp" src={post.user.profileImg} roundedCircle />
    )
  } else {
    return <div />
  }
}

function UserInformation(props) {
  const {post} = props
  if (post !== undefined && post.user !== undefined) {
    const user = post.user
    return (
      <div className="post-handle">
        <Link to={`/u/${user.username}`}>
          <p className="handle-text">{user.name}</p>
          <p className="handle-text">@{user.username}</p>
        </Link>
      </div>
    )
  } else {
    return <div />
  }
}

function Ratings(props) {
  const {location} = props
  if (
    !location ||
    !location.locationReviews ||
    !location.locationReviews[0] ||
    !location.locationReviews[0].ratings
  )
    return <div />

  const halfStar = (
    <img src="https://img.icons8.com/material-sharp/452/star-half.png" />
  )
  const averageRating =
    location.locationReviews
      .map(r => r.ratings)
      .reduce((acc, cur) => acc + cur) / location.locationReviews.length
  const partial = averageRating % Math.floor(averageRating)
  const rounded = averageRating - partial
  // console.log('partial + rating', partial, rating)
  const numOfStars = Array(rounded).fill('')
  return (
    <div className="stars">
      {/* <p>this is the rating average: <strong>{rounded}</strong></p> */}
      <p>Rating:</p>
      {numOfStars.map((e, i) => (
        <img
          key={i}
          src="https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-star-icon-png-image_4013709.jpg"
        />
      ))}
      {partial > 0.25 && partial < 0.75 && halfStar}
    </div>
  )
}

class SingleLocationView extends React.Component {
  constructor() {
    super()
    this.state = {
      location: {},
      viewport: {
        width: 1000,
        height: 700,
        // latitude: coords[1],
        // longitude: coords[0],
        zoom: 12
      }
    }
    // this.state = {location: {}}
    // this.renderMap = this.renderMap.bind(this)
  }
  componentDidMount() {
    this.props.fetchLocation()
    console.log('props in comp did mount singlelocation', this.props)
    this.setState({location: this.props.location})
    console.log('state in comp did mount singlelocation', this.state)
    // if(this.props.location.geometry && this.props.location.geometry.coordinates){
    //   const coords = this.props.location.geometry.coordinates
    //   this.setState({viewport: {width: 1000,
    //     height: 700,
    //     latitude: coords[1],
    //     longitude: coords[0],
    //     zoom: 12}})

    //   console.log('state in comp did mount singlelocation', this.state)
    // }
  }
  componentDidUpdate() {
    if (this.state.location.id !== this.props.location.id) {
      this.setState({location: this.props.location})
    }
  }
  handleShowForm() {
    this.setState({show: true})
  }

  handleHideForm() {
    this.setState({show: false})
  }
  // renderMap(coords) {
  //   this.setState({
  //     viewport: {width: 1000,
  //     height: 700,
  //     latitude: coords[1],
  //     longitude: coords[0],
  //     zoom: 12}
  //   })
  //   this.setState({location: this.props.location})
  //   console.log('state in method singlelocation', this.state)
  //   return <Map locationId={this.props.location.id} />
  //   return (<MapGL
  //   mapStyle="mapbox://styles/mapbox/streets-v11"
  //   mapboxApiAccessToken={mapboxToken}
  //   {...this.state.viewport}
  //   // onViewportChange={viewport => this.setState({viewport})}
  //   ></MapGL>)
  // }

  render() {
    const location = this.props.location
    // const location = this.state.location

    if (!location || !location.id)
      return <div>Not enough info about this location yet</div>
    // let map
    // if(location.geometry && location.geometry.coordinates
    //   && !this.state.location.geometry
    //   ) {
    //     console.log('state in if before singleLocation render', this.state.location)
    //   let coordinates = location.geometry.coordinates
    //   map = this.renderMap(coordinates)
    // }
    // {location && location.geometry && location.geometry.coordinates
    //   && this.state.location.id !== location.id ?
    //     this.renderMap()
    //     // (<MapGL
    //     //   mapStyle="mapbox://styles/mapbox/streets-v11"
    //     //   mapboxApiAccessToken={mapboxToken}
    //     //   {...this.state.viewport}
    //     //   onViewportChange={viewport => this.setState({viewport})}
    //     // ></MapGL>)
    //     : ''}

    return (
      <div className="page-container">
        <div className="single-location-view-container">
          <div key={location.id} className="single-post">
            {/* <PostingPictures className="post-photos" post={post} /> */}
            <div className="photo-and-map">
              {location.coverImg ? (
                <div className="location-photos">
                  <img
                    src={location.coverImg}
                    className="single-location-view-img"
                  />
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="rating-and-address">
              <Ratings location={location} />
              <p>{location.address}</p>
            </div>

            <div className="description-container">
              <p className="post-text">
                <strong>{location.name}</strong>
              </p>
              <p>{location.description}</p>
            </div>
            {/* <div className="description-and-reviews"></div> */}
            <div
              className="single-location-feedback"
              onClick={() => this.handleShowForm()}
            >
              <img
                className="reply-comment-button"
                src="https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/reply-512.png"
              />
              <p>Rate</p>
              <AddLocationReview
                addReview={this.props.addReview}
                locationId={location.id}
              />
            </div>
            <LocationReviews post={location} />
          </div>
          <div className="profileMapContainer sticky">
            {this.state.location.id && (
              <Map locationId={this.state.location.id} />
            )}
          </div>
          {/* <div className="post-header">
            <UserPFP post={location} />
            <div className="post-info">
              <UserInformation post={location} />
            </div>
          </div> */}
        </div>
      </div>
    )
  }
}

const mapState = state => ({location: state.singleLocation})

const mapDispatch = (dispatch, ownProps) => {
  const id = ownProps.match.params.id
  return {
    fetchLocation: () => dispatch(fetchOneLocation(id)),
    addReview: (locationId, review) =>
      dispatch(addLocationReviewThunk(locationId, review))
  }
}

export default connect(mapState, mapDispatch)(SingleLocationView)
