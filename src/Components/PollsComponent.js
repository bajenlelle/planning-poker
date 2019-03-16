import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import PollListItem from './PollListItem'
import CreatePollModal from '../Modals/CreatePollModal'
import  { createPoll } from '../store/actions/pollActions'

class PollsComponent extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      show: false
    }
  }

  mappedPolls() {
    var pollsCopy = Object.assign([], this.props.polls)
    pollsCopy = pollsCopy.sort((a, b) => {
      return a.createdAt.toDate() - b.createdAt.toDate()
    })
    return pollsCopy.reverse().map((poll, i) => {
      return (
        <PollListItem
          key={i}
          poll={poll}
        />
      )
    })
  }

  toggleShow() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { polls } = this.props
    if (polls) {
      return (
        <div>
          <CreatePollModal
            createPoll={this.props.createPoll}
            userEmail={this.props.userEmail}
            show={this.state.show}
            toggleShow={this.toggleShow.bind(this)}
             />
          <h1 className="display-4 text-center mt-5 text-dark">Polls</h1>
          <div className="h-100 row align-items-center justify-content-center">
            <div className="list-group col-6 pt-5 pb-5">
              { polls && this.mappedPolls()}
              { polls.length === 0 &&
                <div className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">There are no polls yet..</h5>
                    <Link onClick={this.toggleShow.bind(this)} to={'#'} className="mb-1 btn btn-primary">Create one</Link>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="h-100 row align-items-center justify-content-center">
          <div className="spinner-border text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )
    }
  }
}

export const mapStateToProps = (state) => {
  return {
    polls: state.firestore.ordered.polls,
    userEmail: state.firebase.auth.email
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPoll: (poll, username) => dispatch(createPoll(poll, username))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'polls' }
  ])
)(PollsComponent)
