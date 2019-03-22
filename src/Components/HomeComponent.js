import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import CreatePollModal from '../Modals/CreatePollModal'
import { createPoll } from '../store/actions/pollActions'


class HomeComponent extends React.Component {
  // Renders View Polls and Create Poll buttons on start page

  constructor(props){
    super(props)
    this.state = {
      show: false
    }
  }

  toggleShow() {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
        <div className="h-100x containerx">
          <h1 className="mt-5 pb-5 mb-5 display-4 text-dark text-center">Planning Poker</h1>
          <div className="mt-5 pt-5 h-100 row align-items-center justify-content-center">
            <CreatePollModal
              createPoll={this.props.createPoll}
              userEmail={this.props.userEmail}
              show={this.state.show}
              toggleShow={this.toggleShow.bind(this)}
               />
            <div className="list-group col-4">
              <button onClick={this.toggleShow.bind(this)} href="#" className="list-group-item list-group-item-action">Create Poll</button>
              <Link to="/polls" className="list-group-item list-group-item-action">View Polls</Link>
            </div>
          </div>
        </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPoll: (task, description, username) => dispatch(createPoll(task, description, username))
  }
}

export const mapStateToProps = (state) => {
  return {
    userEmail: state.firebase.auth.email
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
