import React from 'react'
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
    // Add a vote to newPoint, and remove a vote from prevPoint
    const newData1 = data.map(el => (el.name === newPoint ? Object.assign({}, el, { value: el.value + 1 }) : el))
    const newData2 = newData1.map(el => (el.name === prevPoint ? Object.assign({}, el, { value: el.value - 1 }) : el))

    this.props.votePoll(pollId, newData2)
  }

  render() {
    const { poll } = this.props
    if (poll) {
      return (
        <div className="d-block h-100 row align-items-center justify-content-center pt-5 pb-5">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body w-100">
                  <BarChartView data={poll.data} task={poll.task} />
                </div>
              </div>
            </div>
          </div>
          <div className="row pb-5 mt-3">
            <div className="col">
              <ButtonGroupView onVote={this.onVote.bind(this)} />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="h-100 row align-items-center justify-content-center">
          <div className="spinner-border text-light" role="status">
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
    poll
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    votePoll: (poll, point) => dispatch(votePoll(poll, point))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'polls' }
  ])
)(PollDetailsComponent)
