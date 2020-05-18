/* eslint-disable complexity */
import React from 'react'
import {Modal} from 'react-bootstrap'

function ShowInfo(props) {
  const {profile} = props
  if (
    profile !== undefined &&
    profile.follower !== undefined &&
    profile.follower.length
  ) {
    return (
      <div>
        {profile.follower.map(user => {
          return <p key={user.id}>{user.username}</p>
        })}
      </div>
    )
  } else {
    return <div />
  }
}

class PopUpDisplay extends React.Component {
  render() {
    return (
      <Modal
        onHide={this.props.onHide}
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ShowInfo profile={this.props.profile} />
      </Modal>
    )
  }
}

export default PopUpDisplay