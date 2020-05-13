import React from 'react'
import {connect} from 'react-redux'
import {fetchOneCommunity} from '../store/community'
import {Link} from 'react-router-dom'

class CommunitySearch extends React.Component {
  constructor() {
    super()
    this.state = {
      community: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchOneCommunity(this.state.community)
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

    if (community) {
      if (Array.isArray(community)) {
        return (
          <div>
            {community.map(result => {
              return (
                <div key={result.id}>
                  <div>{result.name}</div>
                  <div>{result.description}</div>
                  <Link to={`/Community/${result.id}`}>Detail</Link>
                  <button type="button">Follow</button>
                </div>
              )
            })}
          </div>
        )
      } else {
        return (
          <div>
            <div>{community.name}</div>
            <div>{community.description}</div>
            <Link to={`/Community/${community.id}`}>Detail</Link>
            <button type="button">Follow</button>
          </div>
        )
      }
    } else return <div>Non</div>
  }

  render() {
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
