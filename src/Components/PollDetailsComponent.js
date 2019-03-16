import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import ButtonGroupView from './ButtonGroupView'
import BarChartView from './BarChartView'
import { votePoll } from '../store/actions/pollActions'


class PollDetailsComponent extends React.Component {

  onVote(newPoint, prevPoint) {
    const pollId = this.props.match.params.id
    const data = this.props.poll.data
    const userVotes = this.props.profile.votes

    // Add a vote to newPoint, and remove a vote from prevPoint:
    const newData1 = data.map(el => (el.name === newPoint ? Object.assign({}, el, { value: el.value + 1 }) : el))
    const newData2 = newData1.map(el => (el.name === prevPoint ? Object.assign({}, el, { value: el.value - 1 }) : el))

    // Kollar igenom votes och ändrar ett objekt om den finns, om den inte hitter något vill du skapa ett nytt objekt:
    let found = false
    const newUserVotes = userVotes.map(el => {
      if (el.id === pollId) {
        found = true
        return Object.assign({}, el, { point: newPoint })
      } else {
        return el
      }
    })
    if (!found) {
      newUserVotes.push({
        id: pollId,
        point: newPoint
      })
    }

    this.props.votePoll(pollId, newData2, newUserVotes, this.props.auth.uid)
  }

  render() {
    const { poll, profile } = this.props
    if (poll && profile.isLoaded) {
      return (
        <div>
          <Link to='/polls'><button className="btn btn-secondary mt-4">Back to polls</button></Link>
          <div className="d-block h-100 row align-items-center justify-content-center pt-4 pb-5">
            <div className="card">
              <div className="row">
                <div className="col">
                  <div className="">
                    <div className="card-body w-100">
                      <BarChartView
                      data={poll.data}
                      task={poll.task}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pb-5">
                <div className="col">
                  <ButtonGroupView
                  onVote={this.onVote.bind(this)}
                  pollId={this.props.match.params.id}
                  profile={this.props.profile}
                  />
                </div>
              </div>
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

export const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id
  const polls = state.firestore.data.polls
  const poll = polls ? polls[id] : null
  return {
    poll,
    profile: state.firebase.profile,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    votePoll: (pollId, newData, newUserVotes, uid) => dispatch(votePoll(pollId, newData, newUserVotes, uid))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'polls' }
  ])
)(PollDetailsComponent)
