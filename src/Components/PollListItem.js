import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

class PollListItem extends React.Component {
  // Each item in the /polls list

  render() {
    const { poll } = this.props
    return (
      <Link to={'/poll/' + poll.id} className="list-group-item list-group-item-action">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{poll.task}</h5>
          <small>{moment(poll.createdAt.toDate()).fromNow()}</small>
        </div>
        <div className="d-flex w-100 justify-content-between">
          <small>By: {poll.creator}</small>
        </div>
      </Link>
    )
  }
}

export default PollListItem
