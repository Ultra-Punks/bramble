/* eslint-disable react/jsx-key */
import React from 'react'
import {connect} from 'react-redux'
import {fetchOneCommunity} from '../store/community'

class CommunitySearch extends React.Component {
  constructor() {
    super()
    this.state = {
      community: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit() {
    event.preventDefault()
    try {
      this.props.fetchOneCommunity(this.state.community)
      this.setState({
        community: ''
      })
    } catch (error) {
      console.log('error')
    }
  }

  searchResults() {
    const community = this.props.community
    if (community.length >= 1) {
      return (
        <div>
          {community.map(result => {
            return (
              <div>
                <h1>{result.name}</h1>
              </div>
            )
          })}
        </div>
      )
    } else {
      return <div>{community.name}</div>
    }
  }

  render() {
    // const community = this.props.community
    console.log('thisssss', this.props)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            name="community"
            type="text"
            onChange={this.handleChange}
            value={this.state.community}
          />
          <button type="submit"> Submit </button>
        </form>
        <div>{this.searchResults()}</div>
      </div>
    )
  }
}

const mapState = state => ({community: state.community})

const mapDispatch = dispatch => ({
  fetchOneCommunity: name => dispatch(fetchOneCommunity(name))
})

const CommunityPage = connect(mapState, mapDispatch)(CommunitySearch)

export default CommunityPage
