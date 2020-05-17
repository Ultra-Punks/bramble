import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  SinglePostView,
  Map,
  AllProfiles,
  ProfileView,
  SingleComment,
  SingleLocation,
  AddLocationForm
} from './components'
import Test from './components/test'
import CommunitySearch from './components/communitySearch'
import {me} from './store'
import CommunityProfile from './components/communityProfile'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/map" component={Map} />
        {/* <Route exact path="/l/add" component={AddLocationForm} /> */}
        <Route path="/l/:id" component={SingleLocation} />
        <Route path="/test" component={Test} />
        <Route exact path="/community" component={CommunitySearch} />
        <Route exact path="/community/list/:id" component={CommunityProfile} />
        <Route path="/profiles" component={AllProfiles} />
        <Route path="/u/:username" component={ProfileView} />
        <Route path="/p/:postId" component={SinglePostView} />
        <Route path="/comments/:commentId" component={SingleComment} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
