import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import CreatePollModal from '../Modals/CreatePollModal'
import { createPoll } from '../store/actions/pollActions'


class HomeComponent extends React.Component {

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
          <div className="h-100 row align-items-center justify-content-center">
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
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPoll: (poll, username) => dispatch(createPoll(poll, username))
  }
}

export const mapStateToProps = (state) => {
  return {
    userEmail: state.firebase.auth.email
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
