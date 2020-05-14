import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Image, Button} from 'react-bootstrap'
import {AddPost} from './index'

const Navbar = ({handleClick, isLoggedIn, username, profileImg}) => {
  const [modalShow, setModalShow] = React.useState(false)
  return (
    <div className="nav-container">
      <div className="nav-group">
        <p className="nav-title">Bramble</p>
        <Image
          className="nav-logo"
          src="https://visualpharm.com/assets/319/Male%20User-595b40b65ba036ed117d3de6.svg"
          roundedCircle
        />
      </div>

      <Image
        className="nav-logo"
        src="https://cdn0.iconfinder.com/data/icons/kirrkle-maps-and-navigation/60/10_-_Map_marker-512.png"
        roundedCircle
      />
      <div className="nav-group">
        <Button variant="danger" onClick={() => setModalShow(true)}>
          Add Post
        </Button>

        <nav>
          <div className="signin-signup">
            {isLoggedIn ? (
              <div>
                <AddPost
                  username={username}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  profileImg={profileImg}
                />
                {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    username: state.user.username,
    profileImg: state.user.profileImg
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
