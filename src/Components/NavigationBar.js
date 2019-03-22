import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOut } from '../store/actions/authActions'
import Avatar from 'react-avatar'
import CreatePollModal from '../Modals/CreatePollModal'
import { createPoll } from '../store/actions/pollActions'


class NavigationBar extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      show: false
    }
  }

  loggedInLinks() {
    const { email } = this.props.auth
    return (
      <div className='navbar-nav'>
        <Avatar name={email} size="40" round={true} />
        <Link to='#' onClick={this.props.signOut} className='nav-item nav-link'>Logout</Link>
      </div>
    )
  }

  toggleShow() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { auth } = this.props
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <CreatePollModal
          createPoll={this.props.createPoll}
          userEmail={this.props.userEmail}
          show={this.state.show}
          toggleShow={this.toggleShow.bind(this)}
           />
        <Link className="navbar-brand" to="/">Planner</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link" to="/polls">View polls</Link>
            <Link to='#' onClick={this.toggleShow.bind(this)} className="nav-item nav-link">Create Poll <span className="sr-only">(current)</span></Link>
          </div>
          { auth.uid && this.loggedInLinks() }
        </div>
      </nav>
    )
  }
}

export const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    userEmail: state.firebase.auth.email
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    createPoll: (task, description, username) => dispatch(createPoll(task, description, username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)
