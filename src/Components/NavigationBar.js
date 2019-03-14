import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOut } from '../store/actions/authActions'
import Avatar from 'react-avatar'

class NavigationBar extends React.Component {

  loggedInLinks() {
    const { email } = this.props.auth
    return (
      <div className='navbar-nav'>
        <Avatar name={email} size="40" round={true} />
        <Link to='#' onClick={this.props.signOut} className='nav-item nav-link'>Logout</Link>
      </div>
    )
  }

  render() {
    const { auth } = this.props
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Planner</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            <Link className="nav-item nav-link" to="/polls">Polls</Link>
          </div>
          { auth.uid && this.loggedInLinks() }
        </div>
      </nav>
    )
  }
}

export const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)
